import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../Appwrite/ServiceConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue,
        control, getValues } = useForm({
            mode: 'onSubmit',
            reValidateMode: 'onSubmit',
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                previewText: post?.previewText || '',
                content: post?.content || '',
                status: post?.status || 'active',
            }
        })

    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)

    const submit = async (data) => {

        if (post) {

            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featured_Image)
            }
            const DBpost = await appwriteService.updatePost(
                post.$id, {
                ...data,
                feature_Image: file ? file.$id : undefined,
            }
            )

            if (DBpost) {
                navigate(`/post/${DBpost.$id}`)
            }
        } else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            console.log(file)

            if (file) {
                const fileId = file.$id;
                data.featured_Image = fileId
                const DBPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if (DBPost) {
                    navigate(`/post/${DBPost.$id}`)
                }

            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        }
        return '';
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title
                    , { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap justify-center">

            <div className='flex flex-row flex-wrap gap-[5vw]'>
                <div className='w-[45vw] px-1'>
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...{readOnly: "readonly"}}
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />

                    <Input
                        label="Preview Text :"
                        placeholder="preview text"
                        className="mb-4"
                        {...register("previewText", { required: true })}
                    />

                </div>

                <div className='w-[45vw] px-1'>
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featured_Image)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}

                    <label
                        className='inline-block mb-1 pl-1'
                        htmlFor="">
                        Post Visibility :
                    </label>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                </div>
            </div>

            <div className="w-full px-2">
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-400"} className="w-[50%] my-4">
                {post ? "Update" : "Submit"}
            </Button>

        </form>
    )
}

export default PostForm
