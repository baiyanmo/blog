import I18nKey from "@i18n/i18nKey";
import { LinkPreset, type NavBarLink } from "@/types/config";

export const getLinkPreset = (
	i18n: (key: I18nKey) => string,
): { [key in LinkPreset]: NavBarLink } => ({
	[LinkPreset.Home]: {
		name: i18n(I18nKey.home),
		url: "/",
	},
	[LinkPreset.About]: {
		name: i18n(I18nKey.about),
		url: "/about/",
	},
	[LinkPreset.Archive]: {
		name: i18n(I18nKey.archive),
		url: "/archive/",
	},
	[LinkPreset.Friends]: {
		name: i18n(I18nKey.friends),
		url: "/friends/",
	},
});
