import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66f6aaaa00213d1cc815"); // Replace with your project ID

export const account = new Account(client);
