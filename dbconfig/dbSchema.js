/*
  Banco de dados - PUMA

  Nmr Tabelas: 13
  Nome do banco de dados: puma
  Criado por: Gabriel Tiveron
  Última alteração: Criação do script
    - EMAIL -> UNIQUE
    - CPF E CNPJ -> CHAR
    - ADD FK SUBJECT -> PROJECT
*/

module.exports = Object.freeze({
  DBSCHEMALEN: 15,
  DBSCHEMA: `
  CREATE TYPE stats AS ENUM ('Em alocacao', 'Aguardando aprovacao', 'Aprovado', 'Recusado');
  CREATE TABLE COMMON_USER (
      userId SERIAL,
      fullName VARCHAR(60) NOT NULL,
      email VARCHAR(70) NOT NULL,
      passwordHash VARCHAR(1000) NOT NULL,
      phoneNumber VARCHAR(12),
      isAdmin BOOL DEFAULT FALSE NOT NULL,

      CONSTRAINT COMMON_USER_PK PRIMARY KEY (userId),
      CONSTRAINT COMMON_USER_UK UNIQUE (email)
  );

  CREATE TABLE STUDENT (
      regNumber VARCHAR(9) NOT NULL,
      softSkills VARCHAR(100) NOT NULL,
      userId SERIAL NOT NULL,

      CONSTRAINT STUDENT_PK PRIMARY KEY (regNumber),
      CONSTRAINT STUDENT_UK UNIQUE (userId),
      CONSTRAINT STUDENT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
  );

  CREATE TABLE JURIDICAL_AGENT (
      cnpj VARCHAR(14) NOT NULL,
      cep VARCHAR(8) NOT NULL,
      companyName varchar(100) NOT NULL,
      socialReason VARCHAR(100) NOT NULL,
      userId SERIAL NOT NULL,

      CONSTRAINT JURIDICAL_AGENT_PK PRIMARY KEY(userId),
      CONSTRAINT JURIDICAL_AGENT_UK UNIQUE (cnpj),
      CONSTRAINT JURIDICAL_AGENT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
  );

  CREATE TABLE PROFESSOR (
      regNumber SERIAL,
      userId SERIAL NOT NULL,

      CONSTRAINT PROFESSOR_PK PRIMARY KEY (regNumber),
      CONSTRAINT PROFESSOR_UK UNIQUE (userId),
      CONSTRAINT PROFESSOR_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
  );

  CREATE TABLE PHYSICAL_AGENT (
      cpf VARCHAR(11) NOT NULL,
      userId SERIAL NOT NULL,

      CONSTRAINT PHYSICAL_AGENT_PK PRIMARY KEY(userId),
      CONSTRAINT PHYSICAL_AGENT_UK UNIQUE (cpf),
      CONSTRAINT PHYSICAL_AGENT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
  );

  CREATE TABLE SUBJECT (
      subjectId SERIAL,
      name VARCHAR(100) NOT NULL,
      courseSyllabus VARCHAR(10000),

      CONSTRAINT SUBJECT_PK PRIMARY KEY (subjectId)
  );

  CREATE TABLE PROJECT (
      projectId SERIAL,
      name varchar(50) NOT NULL,
      problem VARCHAR(100) NOT NULL,
      expectedResult VARCHAR(500) NOT NULL,
      status stats DEFAULT 'Em alocacao' NOT NULL,
      userId SERIAL NOT NULL,
      subjectId SERIAL,

      CONSTRAINT PROJECT_PK PRIMARY KEY (projectId),
      CONSTRAINT PROJECT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId),
      CONSTRAINT PROJECT_SUBJECT_FK FOREIGN KEY (subjectId)
        REFERENCES SUBJECT (subjectId)
  );

  CREATE TABLE KNOWLEDGE_AREA (
      knowledgeAreaId SERIAL,
      knowledgeArea VARCHAR(100) NOT NULL,

      CONSTRAINT KNOWLEDGE_AREA_PK PRIMARY KEY (knowledgeAreaId),
      CONSTRAINT KNOWLEDGE_AREA_UK UNIQUE (knowledgeArea)
  );

  CREATE TABLE SUBAREA (
    subAreaId SERIAL,
    knowledgeAreaId SERIAL NOT NULL,
    description VARCHAR(100) NOT NULL,

    CONSTRAINT SUBAREA_PK PRIMARY KEY (subAreaId),
    CONSTRAINT SUBAREA_KNOWLEDGE_AREA_FK FOREIGN KEY (knowledgeAreaId)
      REFERENCES KNOWLEDGE_AREA (knowledgeAreaId),
    CONSTRAINT SUBAREA_UK UNIQUE (description, knowledgeAreaId)
  );

  CREATE TABLE has (
      subAreaId SERIAL NOT NULL,
      projectId SERIAL NOT NULL,

      CONSTRAINT has_SUBAREA_FK FOREIGN KEY (subAreaId)
        REFERENCES SUBAREA (subAreaId),
      CONSTRAINT has_PROJECT FOREIGN KEY (projectId)
        REFERENCES PROJECT (projectId),
      CONSTRAINT has_UK UNIQUE (subAreaId, projectId)
  );

  CREATE TABLE FILE (
      fileId SERIAL,
      fileName VARCHAR(100) NOT NULL,
      byteContent BYTEA NOT NULL,
      projectId SERIAL,

      CONSTRAINT FILE_PK PRIMARY KEY (fileId),
      CONSTRAINT FILE_PROJECT_FK FOREIGN KEY (projectId)
        REFERENCES PROJECT (projectId)
  );


  CREATE TABLE CLASS (
      classId SERIAL,
      subjectTerm VARCHAR(100) NOT NULL,
      code VARCHAR(3) NOT NULL,
      studentRegNumber VARCHAR(9),
      professorRegNumber SERIAL,
      subjectId SERIAL,

      CONSTRAINT CLASS_PK PRIMARY KEY(classId),
      CONSTRAINT CLASS_PROFESSOR_FK FOREIGN KEY(professorRegNumber)
        REFERENCES PROFESSOR (regNumber),
      CONSTRAINT CLASS_STUDENT_FK FOREIGN KEY (studentRegNumber)
        REFERENCES STUDENT (regNumber),
      CONSTRAINT CLASS_SUBJECT_FK FOREIGN KEY (subjectId)
        REFERENCES SUBJECT (subjectId)
  );

  CREATE TABLE participates (
      regNumber VARCHAR(9) NOT NULL,
      classId SERIAL,

      CONSTRAINT participates_STUDENT_FK FOREIGN KEY (regNumber)
        REFERENCES STUDENT(regNumber),
      CONSTRAINT participates_UK UNIQUE(regNumber, classId)
  );

  CREATE TABLE executes (
      regNumber VARCHAR(9) NOT NULL,
      projectId SERIAL,

      CONSTRAINT executes_STUDENT_FK FOREIGN KEY (regNumber)
        REFERENCES STUDENT (regNumber),
      CONSTRAINT executes_PROJECT_FK FOREIGN KEY (projectId)
        REFERENCES PROJECT (projectId),
      CONSTRAINT executes_UK UNIQUE (regNumber, projectId)
  );

  CREATE TABLE identifies (
      subAreaId SERIAL,
      subjectId SERIAL,

      CONSTRAINT identifies_SUBAREA_FK FOREIGN KEY (subAreaId)
        REFERENCES SUBAREA (subAreaId),
      CONSTRAINT identifies_SUBJECT_FK FOREIGN KEY (subjectId)
        REFERENCES SUBJECT (subjectId),
      CONSTRAINT identifies_UK UNIQUE (subAreaId, subjectId)
  );
`,
});