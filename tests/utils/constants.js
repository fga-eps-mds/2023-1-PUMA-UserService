/* eslint-disable */

module.exports = {
    USER: {
        REGISTER: {
            STUDENT: {
                SUCCESS: {
                    T1: {
                        type: "Aluno",
                        name: "Estudante 20",
                        email: "user20@email.com",
                        matricula: "200888877",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "11651516561",
                    }
                }, FAILURE: {
                    T1: {
                        T1: {
                            type: "Aluno",
                            name: "Estudante 20",
                            email: "user20@email.com",
                            matricula: null,
                            password: "s123456",
                            repeatPassword: "s123456",
                            phoneNumber: "11651516561",
                        }
                    }
                },
            },
            PROFESSOR: {
                SUCCESS: {
                    T1: {
                        type: "Professor",
                        email: "user21@email.com",
                        matricula: "150007458",
                        name: "Professor 21",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "11651516879",
                    }
                },
                FAILURE: {
                    T1: {
                        type: "Professor",
                        email: "user21@email.com",
                        matricula: null,
                        name: "Professor 21",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "11651516879",
                    }
                },
            },
            JURIDICAL_AGENT: {
                SUCCESS: {
                    T1: {
                        type: "Agente Externo",
                        cnpj: "11874932000180",
                        companyName: "A Empresa 22",
                        socialReason: "Empresa 22 Ltda",
                        externalAgentType: "Pessoa Juridica",
                        email: "user22@email.com",
                        name: "Pessoa Jurídica 22",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "61551516561",
                    }
                }, FAILURE: {
                    T1: {
                        type: "Agente Externo",
                        cnpj: null,
                        companyName: "A Empresa 22",
                        socialReason: "Empresa 22 Ltda",
                        externalAgentType: "Pessoa Juridica",
                        email: "user22@email.com",
                        name: "Pessoa Jurídica 22",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "61551516561",
                    }
                },
            },
            PHYSICAL_AGENT: {
                SUCCESS: {
                    T1: {
                        type: "Agente Externo",
                        cpf: "53008548679",
                        externalAgentType: "Pessoa Fisica",
                        email: "user23@email.com",
                        name: "Pessoa Fisica 23",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "61551516777",
                    }
                }, FAILURE: {
                    T1: {
                        type: "Agente Externo",
                        cpf: null,
                        externalAgentType: "Pessoa Fisica",
                        email: "user23@email.com",
                        name: "Pessoa Fisica 23",
                        password: "s123456",
                        repeatPassword: "s123456",
                        phoneNumber: "61551516777",
                    }
                },
            },
        },
        LOGIN: {
            STUDENT: {
                SUCCESS: {
                    T1: {
                        email: 'user05@email.com',
                        password: '123456',
                    }
                },
                FAILURE: {
                    T1: {
                        email: 'user05@email.com',
                        password: null,
                    }
                }
            },
            PROFESSOR: {
                SUCCESS: {
                    T1: {
                        email: 'user04@email.com',
                        password: '123456',
                    }
                },
                FAILURE: {
                    T1: {
                        email: 'user04@email.com',
                        password: null,
                    }
                }
            },
            JURIDICAL_AGENT: {
                SUCCESS: {
                    T1: {
                        email: 'user01@email.com',
                        password: '123456',
                    }
                },
                FAILURE: {
                    T1: {
                        email: 'user01@email.com',
                        password: null,
                    }
                }
            },
            PHYSICAL_AGENT: {
                SUCCESS: {
                    T1: {
                        email: 'user09@email.com',
                        password: '123456',
                    }
                },
                FAILURE: {
                    T1: {
                        email: 'user09@email.com',
                        password: null,
                    }
                }
            },
        },
    },
};