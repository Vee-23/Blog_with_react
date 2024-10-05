import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, previewText, featured_Image, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    previewText,
                    content,
                    featured_Image,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw console.log("Appwrite service :: createPost - Error", error);;

        }
    }

    async updatePost(slug, {title, content, previewText, featured_Image, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    previewText,
                    content,
                    featured_Image,
                    status,
                }
            )
        } catch (error) {
            throw console.log("Appwrite service :: UpdatePost - Error", error);;
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
                )
                return true
        } catch (error) {
            throw console.log("Appwrite service :: deletePost - Error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw console.log("Appwrite service :: getPost - Error", error);;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw console.log("Appwrite service :: getPosts - Error", error);
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw console.log("Appwrite service :: UploadFile - Error", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw console.log("Appwrite service :: deleteFile - Error", error);
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default service