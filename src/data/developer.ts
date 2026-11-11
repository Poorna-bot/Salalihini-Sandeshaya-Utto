export interface DeveloperLink {
  label: string;
  url: string;
}

export interface DeveloperProfile {
  name: string;
  contactUrl: string;
  contactLabel: string;
  repoUrl: string;
  sponsorUrl: string;
  links: DeveloperLink[];
}

export const DEVELOPER: DeveloperProfile = {
  name: "Poorna Thalisha",
  contactUrl: "https://github.com/Poorna-bot",
  contactLabel: "GitHub Profile (@Poorna-bot)",
  repoUrl: "https://github.com/Poorna-bot/Salalihini-Sandeshaya-Kavya",
  sponsorUrl: "",
  links: [
    {
      label: "Poorna Thalisha (@Poorna-bot)",
      url: "https://github.com/Poorna-bot"
    },
    {
      label: "Source on GitHub",
      url: "https://github.com/Poorna-bot/Salalihini-Sandeshaya-Kavya"
    }
  ]
};
