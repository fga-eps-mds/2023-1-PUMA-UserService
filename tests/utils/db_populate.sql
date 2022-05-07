-- Users Password: 123456

INSERT INTO COMMON_USER(fullName, email, passwordHash, phoneNumber, isAdmin) VALUES
  ('Pessoa Jurídica 01', 'user01@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- JURIDICAL_AGENT
  ('Pessoa Jurídica 02', 'user02@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- JURIDICAL_AGENT
  ('Professor 03', 'user03@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- PROFESSOR
  ('Professor 04', 'user04@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- PROFESSOR
  ('Estudante 05', 'user05@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- STUDENT
  ('Estudante 06', 'user06@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- STUDENT
  ('Estudante 07', 'user07@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- STUDENT
  ('Estudante 08', 'user08@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- STUDENT
  ('Pessoa Física 09', 'user09@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- PHYSICAL_AGENT
  ('Pessoa Física 10', 'user10@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', FALSE), -- PHYSICAL_AGENT
  ('Administrador 11', 'user11@email.com', '$2a$10$vnFHs3uo3aBvupx9PecdHOpBnuILY9JLpGh4BT30FxwLgFKrk9Ex.', '6131385416', TRUE)   -- ADMIN
  ON CONFLICT DO NOTHING; 

INSERT INTO STUDENT(regNumber, softSkills, userId) VALUES
  ('170142421', 'BI;SQL;SCRUM;UI/UX', 6),
  ('180108341', 'SCRUM;UI/UX', 5),
  ('190051277', 'BI;SCRUM;UI/UX', 7),
  ('200015474', 'BI;SCRUM', 8)
  ON CONFLICT DO NOTHING;

INSERT INTO JURIDICAL_AGENT(cnpj, companyName, socialReason, userId) VALUES
  ('39580115000138', 'Padaria da Alegria', 'Padaria da Alegria LTDA.', 1),
  ('89895890000150', 'Mercado Vitória', 'Mercado Vitória Co.', 2)
  ON  CONFLICT DO NOTHING;

INSERT INTO PHYSICAL_AGENT(userId, cpf) VALUES
  (9, '43716301205'),
  (10, '27343964160')
  ON  CONFLICT DO NOTHING;

INSERT INTO PROFESSOR(regNumber, userId) VALUES
  ('6843154', 3),
  ('4354681', 4)
  ON CONFLICT DO NOTHING;

INSERT INTO SUBJECT(name, courseSyllabus) VALUES
  ('PSP-1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget arcu ipsum. Mauris ligula nunc, gravida at felis in, congue rutrum nulla. Phasellus vulputate dictum consectetur. Nulla facilisi. Ut condimentum neque et laoreet pellentesque. Sed eu semper risus. Nam ultrices, tellus eget faucibus efficitur, sapien quam suscipit est, eu porttitor odio ipsum eget risus. Maecenas et ornare ipsum. Praesent non tincidunt arcua.'),
  ('PSP-2', 'Duis non suscipit nulla. Donec id blandit mi. Donec eu rutrum mi. Suspendisse vel sodales sapien, at ultricies nisi. Pellentesque posuere feugiat magna vitae semper. Aenean dictum ullamcorper turpis. Ut egestas, sem a pharetra rutrum, ex ex viverra velit, nec suscipit est magna quis felis. Proin sed tellus eget massa efficitur imperdiet tincidunt eu urnaloa.')
  ON CONFLICT DO NOTHING;

INSERT INTO SEMESTER(subjectId, year, semester, status) VALUES
  (1, 2021, '1', 'CD'),
  (1, 2021, '2', 'AD'),
  (2, 2021, '2', 'AD')
  ON CONFLICT DO NOTHING;

INSERT INTO KNOWLEDGE_AREA(knowledgeArea) VALUES
  ('Probabilidade e Estatística'),
  ('Sistemas de Informação'),
  ('Planejamento de controle da Produção'),
  ('Gestão da Qualidade'),
  ('Engenharia do Produto'),
  ('Gestão Estratégica')
  ON CONFLICT DO NOTHING;

INSERT INTO SUBAREA(knowledgeAreaId, description) VALUES
  (1, 'Análise de Banco de Dados'),
  (1, 'Criação de Questionários de Pesquisa'),
  (1, 'Outras'),
  (2, 'Projeto de Sistemas de Informação'),
  (2, 'Outras'),
  (3, 'Previsão de Demanda'),
  (3, 'Gestão de Estoque'),
  (3, 'Criação de Ferramentas de Apoio ao Planejamento e Controle da Produção'),
  (3, 'Outras'),
  (4, 'Normalização, Auditoria e Certificação para a Qualidade'),
  (4, 'Sistema de Garantia de Qualidade'),
  (4, 'Melhoria de Processos de Produtos e Serviços'),
  (4, 'Controle Estatístico de Processos'),
  (4, 'Melhoria Contínua (MASP-PDCA)'),
  (4, 'Outras'),
  (5, 'Elaboração de Projeto Conceitual de Produto'),
  (5, 'Outras'),
  (6, 'Definição de Objetivos Estratégicos'),
  (6, 'Viabilidade Econômica'),
  (6, 'Desdobramento de Metas'),
  (6, 'Outras')
  ON CONFLICT DO NOTHING;

INSERT INTO KEYWORD(keyword) VALUES
  ('Palavra-Chave 01'),
  ('Palavra-Chave 02'),
  ('Palavra-Chave 03'),
  ('Palavra-Chave 04'),
  ('Palavra-Chave 05'),
  ('Palavra-Chave 06'),
  ('Palavra-Chave 07'),
  ('Palavra-Chave 08'),
  ('Palavra-Chave 09'),
  ('Palavra-Chave 10'),
  ('Palavra-Chave 11'),
  ('Palavra-Chave 12')
  ON CONFLICT DO NOTHING;

INSERT INTO PROJECT(name, problem, expectedResult, feedback, status, userId, subjectId, semesterId) VALUES
  ('Projeto 01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus justo, lobortis rutrum feugiat sit amet, finibus a lectus. Nulla sit amet porttitor turpis. Sed pulvinar mauris condimentum nisl porttitor fringilla. Curabitur finibus bibendum risus, imperdiet congue magna mollis id. Sed tincidunt consectetur cursus. Sed pellentesque ac mi vel pharetra. Maecenas in ullamcorper nibh. Praesent rutrum lobortis malesuada. Nunc arcu ligulat.', 'Phasellus accumsan dui eu nunc dignissim, nec ornare nunc dignissim. Integer maximus elit lectus, egett dapibus magna mollis nec. Aenean a justo nunc.', null, 'SB', 1, 2, null),
  ('Projeto 02', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus justo, lobortis rutrum feugiat sit amet, finibus a lectus. Nulla sit amet porttitor turpis. Sed pulvinar mauris condimentum nisl porttitor fringilla. Curabitur finibus bibendum risus, imperdiet congue magna mollis id. Sed tincidunt consectetur cursus. Sed pellentesque ac mi vel pharetra. Maecenas in ullamcorper nibh. Praesent rutrum lobortis malesuada. Nunc arcu ligulat.', 'Phasellus accumsan dui eu nunc dignissim, nec ornare nunc dignissim. Integer maximus elit lectus, egett dapibus magna mollis nec. Aenean a justo nunc.', null, 'SB', 2, 1, null),
  ('Projeto Mercado Vitória', 'Vivamus sollicitudin imperdiet orci, interdum gravida nibh gravida a. Aliquam a volutpat nisl. Etiam sollicitudin orci a enim cursus convallis. Curabitur quam nisi, finibus sit amet lacus vel, pharetra ultrices leo. Mauris urna mi, tincidunt id felis vel, ullamcorper aliquam ex. Fusce a sapien eu neque auctor hendrerit sed ac sapien.', 'Nullam eleifend dolor ac interdum venenatis. Mauris imperdiet ligula dui, at feugiat nib bibendum condimentum.', 'A proposta de projeto foi aceita e em breve poderá ser alocada a um semestre.', 'EX', 2, 1, 2),
  ('Projeto Padaria da Aleagria', 'Vivamus sollicitudin imperdiet orci, interdum gravida nibh gravida a. Aliquam a volutpat nisl. Etiam sollicitudin orci a enim cursus convallis. Curabitur quam nisi, finibus sit amet lacus vel, pharetra ultrices leo. Mauris urna mi, tincidunt id felis vel, ullamcorper aliquam ex. Fusce a sapien eu neque auctor hendrerit sed ac sapien.', 'Nullam eleifend dolor ac interdum venenatis. Mauris imperdiet ligula dui, at feugiat nib bibendum condimentum.', 'A proposta de projeto foi aceita e em breve poderá ser alocada a um semestre.' ,'EX', 2, 1, 3)
  ON CONFLICT DO NOTHING;

INSERT INTO TEAM(projectId) VALUES
  (3),
  (4)
  ON CONFLICT DO NOTHING;

INSERT INTO abstracts(keywordId, projectId, main) VALUES
  (1, 1, TRUE),
  (2, 1, FALSE),
  (3, 2, TRUE),
  (4, 2, FALSE),
  (5, 3, TRUE),
  (6, 3, FALSE),
  (7, 4, TRUE),
  (8, 4, FALSE)
  ON CONFLICT DO NOTHING;

INSERT INTO summarize(keywordId, subjectId) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 2),
  (6, 2),
  (7, 2),
  (8, 2)
  ON CONFLICT DO NOTHING; 

INSERT INTO identifies(subAreaId, subjectId) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (5, 2),
  (6, 2),
  (7, 2)
  ON CONFLICT DO NOTHING;

INSERT INTO is_registered(regNumber, semesterId) VALUES
  ('170142421', 2),
  ('180108341', 2),
  ('190051277', 3),
  ('200015474', 3)
  ON CONFLICT DO NOTHING;

INSERT INTO participate(teamId, regNumber) VALUES
  (1, '170142421'),
  (1, '180108341'),
  (2, '190051277'),
  (2, '200015474')
  ON CONFLICT DO NOTHING;

INSERT INTO lectures(regNumber, subjectId) VALUES
  ('6843154', 1),
  ('6843154', 2),
  ('4354681', 1),
  ('4354681', 2)
  ON CONFLICT DO NOTHING;

INSERT INTO is_assigned(regNumber, semesterId) VALUES
  ('6843154', 1),
  ('6843154', 2),
  ('6843154', 3),
  ('4354681', 3)
  ON CONFLICT DO NOTHING;