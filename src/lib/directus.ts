import { Directus } from "@directus/sdk"
import getConfig from "next/config"

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { url } = publicRuntimeConfig;
const { email, password, token } = serverRuntimeConfig;

type Article = {
  id: string
  title: string
  category: string
  date_created: Date
  date_updated: Date
  user_created: string
  draft: Boolean
  content: string
}

type Collections = {
  help: Article
};


const directus = new Directus<Collections>(url);

export async function getDirectusClient() {
  if (email && password) {
    await directus.auth.login({ email, password });
  } else if (token) {
    await directus.auth.static(token);
  }

  return directus;
}