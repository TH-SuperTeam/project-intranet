export interface NewsImage {
    id: string;
    url: string;
    alt: string;
    category: "dental" | "general" | "fullstack" | "electrical";
}

export const newsImages: NewsImage[] = [
    {
        id: "programming-01",
        url: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Två personer som arbetar vid datorer",
        category: "fullstack",
    },
    {
        id: "programming-02",
        url: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Kvinna som arbetar vid dator",
        category: "fullstack",
    },
    {
        id: "programming-03",
        url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Person som arbetar med kod på en laptop",
        category: "fullstack",
    },
    {
        id: "dental-01",
        url: "https://images.unsplash.com/photo-1643660527072-47bd5735f721?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Tandvårdsinstrument uppställda på en arbetsyta",
        category: "dental",
    },
    {
        id: "dental-02",
        url: "https://images.unsplash.com/photo-1681939282781-341ac4f61996?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Tandsköterska med patient",
        category: "dental",
    },
    {
        id: "dental-03",
        url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Tandvårdspersonal som granskar röntgenbilder",
        category: "dental",
    },
    {
        id: "electrical-01",
        url: "https://images.unsplash.com/photo-1597502310092-31cdaa35b46d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Elektriker som utför elarbete",
        category: "electrical",
    },
    {
        id: "electrical-02",
        url: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Elektriker som arbetar med en elinstallation",
        category: "electrical",
    },
    {
        id: "electrical-03",
        url: "https://images.unsplash.com/photo-1660330589693-99889d60181e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Arbete med elteknisk utrustning",
        category: "electrical",
    },
    {
        id: "general-01",
        url: "https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Personer som samarbetar kring en arbetsuppgift",
        category: "general",
    },
    {
        id: "general-02",
        url: "https://images.unsplash.com/photo-1758270705518-b61b40527e76?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Studerande som samarbetar kring en laptop",
        category: "general",
    },
    {
        id: "general-03",
        url: "https://images.unsplash.com/photo-1758873269317-51888e824b28?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        alt: "Kollegor som samarbetar runt ett bord",
        category: "general",
    },
];
