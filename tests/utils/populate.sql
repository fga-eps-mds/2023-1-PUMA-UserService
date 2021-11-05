
INSERT INTO COMMON_USER(fullName, email, passwordHash, phoneNumber) VALUES
  ('Gabriel Marques Tiveron', 'tiveron@email.com', 'hashzada da massa hehe', '6131385416'),
  ('Luis Pereira Taira', 'taira@email.com', 'hashzada da massa hehe', '6131385416'),
  ('Eduardo Vieira Lima', 'lima@email.com', 'hashzada da massa hehe', '6131385416'),
  ('João Pedro de Aquino Corrêa Martins', 'martins@email.com', 'hashzada da massa hehe', '6131385416'),
  ('Levi de Oliveira Queiroz', 'queiroz@email.com', 'hashzada da massa hehe', '6131385416'),
  ('Artur Vinicius Dias Nunes', 'nunes@email.com', 'hashzada da massa hehe', '6131385416'),
  ('Nicolas Georgeos Mantzos', 'mantzos@email.com', 'hashzada da massa hehe', '6131385416')
  ON CONFLICT DO NOTHING;

INSERT INTO STUDENT(regNumber, softSkills, userId) VALUES
  ('190142421', 'softzada', 6),
  ('170108341', 'softzada', 5),
  ('170051277', 'softzada', 7)
  ON CONFLICT DO NOTHING;

INSERT INTO JURIDICAL_AGENT(cnpj, cep, companyName, socialReason, userId) VALUES
  ('6854', '321654', 'Padoca', 'Padoca LTDA.', 1),
  ('6548', '498431', 'Hehe', 'Hehe Co.', 2)
  ON  CONFLICT DO NOTHING;

INSERT INTO PROFESSOR(regNumber, userId) VALUES
  ('6843154', 3),
  ('4354681', 4)
  ON CONFLICT DO NOTHING;

INSERT INTO SUBJECT(name, courseSyllabus) VALUES
  ('PSP-5', 'Donec id semper ipsum. Sed et tempus est. Integer aliquet dolor magna, quis lobortis lectus congue nec. Aliquam sodales, nulla a commodo pellentesque, magna est vestibulum risus, ut facilisis massa nulla nec dolor. Sed aliquam, nisl non maximus dapibus, sem.'),
  ('PSP-1', 'Proin sit amet fermentum risus. Nam rutrum id ex in pretium. In lacinia pharetra nibh, ac tristique erat rutrum eget. Morbi pellentesque eu augue eu.'),
  ('PSP-2', 'Aenean rutrum aliquam turpis, nec molestie nulla molestie porta. Ut mauris justo, dignissim a laoreet eu, ultricies ut nibh. Fusce faucibus dolor euismod.'),
  ('PSP-3', 'Nunc in nisl laoreet, lobortis mauris vel, ullamcorper diam. Pellentesque vehicula fermentum diam vel ultrices. In in volutpat erat. In rutrum risus in ullamcorper efficitur. Integer mi nunc, aliquam ut sollicitudin ac, placerat non lectus.'),
  ('PSP-4', 'Morbi ut tempor eros. Nunc iaculis imperdiet mauris, non lobortis urna vestibulum feugiat. Sed ultrices ac lectus sed eleifend. Phasellus malesuada, felis euismod scelerisque ornare, nisl odio tempus orci, ut auctor lorem lectus sit amet velit. Aliquam aliquam ex ut sem eleifend luctus. Nulla non molestie felis, id luctus felis.')
  ON CONFLICT DO NOTHING;

INSERT INTO PROJECT(name, problem, expectedResult, status, userId, subjectId) VALUES
  ('Problemao', 'Realmente um dos problemas já tidos', 'Problema resolvido', 'Aguardando aprovacao', 1, 2),
  ('Vacilo', 'Um dos vacilos já feitos', 'Desvacilar', 'Aguardando aprovacao', 2, 1),
  ('HEHE ta quebrada', 'A Hehe está com o problema tal', 'Resolver o problema tal', 'Aguardando aprovacao', 2, 1),
  ('Padoca falhou', 'Padoca falho no quesito x', 'Resolver o quesito X', 'Aguardando aprovacao', 2, 1)
  ON CONFLICT DO NOTHING;

INSERT INTO KNOWLEDGE_AREA(knowledgeArea) VALUES
  ('Probabilidade e Estatística'),
  ('Sistemas de Informação'),
  ('Planejamento de controle da Produção'),
  ('Gestão da Qualidade'),
  ('Engenharia do Produto'),
  ('Gestão estratégica')
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
  (6, 'Definição de Objetivos Estratégicos'),
  (6, 'Viabilidade Econômica'),
  (6, 'Desdobramento de Metas'),
  (6, 'Outras')
  ON CONFLICT DO NOTHING;

INSERT INTO has(subAreaId, projectId) VALUES
  (1, 2),
  (2, 2),
  (6, 2),
  (7, 2),
  (3,1),
  (9,1),
  (11,1),
  (13,1),
  (20,3),
  (15,3),
  (8,3),
  (6,4),
  (3,4),
  (4,4),
  (1,4)
  ON CONFLICT DO NOTHING;

INSERT INTO identifies(subAreaId, subjectId) VALUES
  (1,2),
  (2,2),
  (3,2),
  (4,3),
  (5,3),
  (6,4),
  (7,4),
  (8,4),
  (9,4),
  (10,5),
  (11,5),
  (12,5),
  (13,5),
  (14,5),
  (15,5),
  (16,5),
  (17,1),
  (18,1)
  ON CONFLICT DO NOTHING;
