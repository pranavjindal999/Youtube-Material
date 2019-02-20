import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import config from '@/config';
import { Language } from '@/translations';

@Module({ namespaced: true, name: "GlobalState" })
export class GlobalState extends VuexModule {
    currentLang: Language = config.defaultLanguage
    regionCode: string = ""
    isDrawerOpen: boolean = false

    @Mutation
    updateLang(lang: Language) {
        this.currentLang = lang;
    }

    @Mutation
    updateDrawer(isDrawerOpen: boolean) {
        this.isDrawerOpen = isDrawerOpen;
    }

    @Mutation
    toggleDrawer() {
        this.isDrawerOpen = !this.isDrawerOpen;
    }

    @Mutation      
    updateRegionCode(regionCode: string) {
        this.regionCode = regionCode;
    }
}
