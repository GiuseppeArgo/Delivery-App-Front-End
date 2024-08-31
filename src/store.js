import { reactive } from "vue";

export const store = reactive({
    apiMainUrl : "http://127.0.0.1:8000",

    foods: [
        {
            image: './src/assets/img/hero/panino-hero-1.png',
            text: './src/assets/img/hero/testo-hero-1.png',
        },
        {
            image: './src/assets/img/hero/foto-hero-1.png',
            text: './src/assets/img/hero/testo-hero-2.png',
        },
        {
            image: './src/assets/img/hero/pizza-hero-1.png',
            text: './src/assets/img/hero/testo-hero-3.png',
        },
    ],
    slug:''
});