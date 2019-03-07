import { ModelsInterface } from "./ModelsInterface";

export interface BaseModelInterface {
    
    // Atributos opcionais.
    // Metodo para criar metodos de instancia dos modulos.
    prototype?;
    
    // Metodo de associoção dos models.
    associate?(models: ModelsInterface): void;
}