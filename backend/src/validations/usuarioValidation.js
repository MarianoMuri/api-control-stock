import Joi from "joi";

export const crearUsuarioSchema = Joi.object({
    nombre: Joi.string().trim().min(2).required().messages({
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "any.required": "El nombre es obligatorio",
    }),

    email: Joi.string().trim().email().required().messages({
        "string.empty": "El email es obligatorio",
        "string.email": "El email no tiene un formato válido",
        "any.required": "El email es obligatorio",
    }),

    password: Joi.string().min(6).required().messages({
        "string.empty": "La contraseña es obligatoria",
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "any.required": "La contraseña es obligatoria",
    }),

    rol: Joi.string().valid("master", "cajero").optional().messages({
        "any.only": "El rol debe ser master o cajero",
    }),
});

export const actualizarUsuarioSchema = Joi.object({
    nombre: Joi.string().trim().min(2).optional().messages({
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 2 caracteres",
    }),

    email: Joi.string().trim().email().optional().messages({
        "string.email": "El email no tiene un formato válido",
    }),

    password: Joi.string().min(6).optional().messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres",
    }),

    rol: Joi.string().valid("master", "cajero").optional().messages({
        "any.only": "El rol debe ser master o cajero",
    }),
}).min(1).messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
});