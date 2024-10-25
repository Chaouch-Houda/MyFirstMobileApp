import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "671a8fbf002a7056f97a",
  databaseId: "671a9239000b223bbf19",
  userCollectionId: "671a92660034b12045a7",
  videosCollectionId: "671a928b0000fc48117d",
  storageId: "671a965d00348b034261",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client); // Gère les utilisateurs (création de compte, authentification, etc.)
const avatars = new Avatars(client); //Permet de générer des avatars pour les utilisateurs (basé sur leur nom ou initiales).
const databases = new Databases(client); // Gère la base de données et permet d'ajouter des documents dans des collections.

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
       }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await  databases.listDocuments(config.databaseId,config.userCollectionId,[Query.equal('accountId',currentAccount.$id)])
        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}