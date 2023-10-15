module.exports = {
    openapi: "3.0.0",
    host: `localhost:${ process.env.PORT }`,
    info:{
        title: "...",
        description: "...",
        contact: {
            name: "...",
            email: "..."
        },
        version: "1.0.0"
    },
    servers:[
        {
            url: `http://localhost:${ process.env.PORT }`
        }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                in: "header",
                name: "authorization",
                description: "...",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            BearerAuth: []
        }
    ],
    paths:{
        "/login":{
            post: {
                summary: "...",
                description: "...",
                requestBody: {
                    desscriptio: "...",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string"
                                    },
                                    senha: {
                                        type: "string"
                                    }
                                }
                            },
                            required: [ "email", "senha" ]
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            }
        },
        "/usuario": {
            get: {
                summary: "...",
                description: "...",
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            },
            post: {
                summary: "...",
                description: "...",
                requestBody: {
                    desscriptio: "...",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    nome: {
                                        type: "string"
                                    },
                                    email: {
                                        type: "string"
                                    },
                                    senha: {
                                        type: "string"
                                    }
                                }
                            },
                            required: [ "nome", "email", "senha" ]
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            },
            put: {
                summary: "...",
                description: "...",
                requestBody: {
                    desscriptio: "...",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    nome: {
                                        type: "string"
                                    },
                                    email: {
                                        type: "string"
                                    },
                                    senha: {
                                        type: "string"
                                    }
                                }
                            },
                            required: [ "nome", "email", "senha" ]
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            }
        },
        "/categoria": {
            get: {
                summary: "...",
                description: "...",
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            }
        },
        "/transacao": {
            get: {
                summary: "...",
                description: "...",
                parameters: [
                    {
                        name: "filtro[]",
                        in: "query",
                        description: "Filtro para transações",
                        required: false,
                        schema: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            },
            post: {
                summary: "...",
                description: "...",
                requestBody: {
                    desscriptio: "...",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    tipo:{
                                        type: "string"
                                    },
                                    descricao: {
                                        type: "string"
                                    },
                                    valor: {
                                        type: "integer"
                                    },
                                    data: {
                                        type: "string"
                                    },
                                    categoria_id: {
                                        type: "string"
                                    }
                                }
                            },
                            required: [ "tipo", "descricao", "valor", "data", "categoria_id" ]
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            }
        },
        "/transacao/{id}": {
            get: {
                summary: "...",
                description: "...",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "...",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            },
            put: {
                summary: "...",
                description: "...",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "...",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                requestBody: {
                    desscriptio: "...",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    tipo:{
                                        type: "string"
                                    },
                                    descricao: {
                                        type: "string"
                                    },
                                    valor: {
                                        type: "integer"
                                    },
                                    data: {
                                        type: "string"
                                    },
                                    categoria_id: {
                                        type: "string"
                                    }
                                }
                            },
                            required: [ "tipo", "descricao", "valor", "data", "categoria_id" ]
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            },
            delete: {
                summary: "...",
                description: "...",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "...",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            },
        },
        "/transacao/extrato": {
            get: {
                summary: "...",
                description: "...",
                responses: {
                    200: {
                        description: "Sucesso. Retorna todas as contas."
                    },
                    400: {
                        description: "Erro na solicitação."
                    }
                }
            }
        }
    }
}