export class RubroAnalisis {
    idRubro: number;
    descripcion: string;
    descripcionCorta: string;

    constructor(rubro: {
        idRubro: number;
        descripcion: string;
        descripcionCorta: string;
    }) {
        if (rubro) {
            this.idRubro = rubro.idRubro;
            this.descripcion = rubro.descripcion;
            this.descripcionCorta = rubro.descripcionCorta;
        }
    }
}
