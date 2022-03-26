/*
  Banco de dados - PUMA

  Nmr Tabelas: 20
  Nome do banco de dados: puma
  Criado por: Gabriel Tiveron, Gustavo Nogueira, Bruno Henrique
  Última alteração: Reestruturação do Banco
*/

module.exports = Object.freeze({
  DBSCHEMALEN: 20,
  DBSCHEMA: `
    CREATE TABLE COMMON_USER (
      userId SERIAL,
      fullName VARCHAR(200) NOT NULL,
      email VARCHAR(70) NOT NULL,
      isAdmin BOOL DEFAULT FALSE NOT NULL,
      phoneNumber VARCHAR(12),
      passwordHash VARCHAR(1000) NOT NULL,
        
      CONSTRAINT COMMON_USER_PK PRIMARY KEY (userId),
      CONSTRAINT COMMON_USER_UK UNIQUE (email)
    );

    CREATE TABLE STUDENT (
      regNumber VARCHAR(9) NOT NULL,
      userId SERIAL NOT NULL,
      softSkills VARCHAR(100) NOT NULL,

      CONSTRAINT STUDENT_PK PRIMARY KEY (regNumber),
      CONSTRAINT STUDENT_UK UNIQUE (userId),
      CONSTRAINT STUDENT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE PROFESSOR (
      regNumber VARCHAR(20),
      userId SERIAL NOT NULL,

      CONSTRAINT PROFESSOR_PK PRIMARY KEY (regNumber),
      CONSTRAINT PROFESSOR_UK UNIQUE (userId),
      CONSTRAINT PROFESSOR_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE JURIDICAL_AGENT (
      userId SERIAL NOT NULL,
      cnpj VARCHAR(14) NOT NULL,
      companyName varchar(100) NOT NULL,
      socialReason VARCHAR(100) NOT NULL,
        
      CONSTRAINT JURIDICAL_AGENT_PK PRIMARY KEY(userId),
      CONSTRAINT JURIDICAL_AGENT_UK UNIQUE (cnpj),
      CONSTRAINT JURIDICAL_AGENT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE PHYSICAL_AGENT (
      userId SERIAL NOT NULL,
      cpf VARCHAR(11) NOT NULL,

      CONSTRAINT PHYSICAL_AGENT_PK PRIMARY KEY(userId),
      CONSTRAINT PHYSICAL_AGENT_UK UNIQUE (cpf),
      CONSTRAINT PHYSICAL_AGENT_COMMON_USER_FK FOREIGN KEY (userId)
          REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE SUBJECT (
      subjectId SERIAL,
      name VARCHAR(200) NOT NULL,
      courseSyllabus VARCHAR(10000),

      CONSTRAINT SUBJECT_PK PRIMARY KEY (subjectId)
    );

    CREATE TYPE stats_project AS ENUM ('SB', 'AN', 'AC', 'RC', 'IC', 'EX', 'EC');

    CREATE TABLE PROJECT (
      projectId SERIAL,
      userId SERIAL NOT NULL,
      subjectId SERIAL,
      name varchar(100) NOT NULL,
      expectedResult VARCHAR(500) NOT NULL,
      feedback VARCHAR(500),
      problem VARCHAR(1000) NOT NULL,
      status stats_project DEFAULT 'SB' NOT NULL,
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,

      CONSTRAINT PROJECT_PK PRIMARY KEY (projectId),
      CONSTRAINT PROJECT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId),
      CONSTRAINT PROJECT_SUBJECT_FK FOREIGN KEY (subjectId)
        REFERENCES SUBJECT (subjectId)
    );

    CREATE TABLE FILE (
      fileId SERIAL NOT NULL,
      projectId SERIAL,
      fileName VARCHAR(100) NOT NULL,
      byteContent BYTEA NOT NULL,

      CONSTRAINT FILE_PK PRIMARY KEY (fileId),
      CONSTRAINT FILE_PROJECT_FK FOREIGN KEY (projectId)
        REFERENCES PROJECT (projectId)
    );

    CREATE TABLE KEYWORD (
      keywordId SERIAL NOT NULL,
      keyword VARCHAR(200) NOT NULL,

      CONSTRAINT KEYWORD_PK PRIMARY KEY (keywordId)
    );

    CREATE TABLE KNOWLEDGE_AREA (
      knowledgeAreaId SERIAL NOT NULL,
      knowledgeArea VARCHAR(200) NOT NULL,

      CONSTRAINT KNOWLEDGE_AREA_PK PRIMARY KEY (knowledgeAreaId),
      CONSTRAINT KNOWLEDGE_AREA_UK UNIQUE (knowledgeArea)
    );

    CREATE TABLE SUBAREA (
      subAreaId SERIAL NOT NULL,
      knowledgeAreaId SERIAL NOT NULL,
      description VARCHAR(200) NOT NULL,

      CONSTRAINT SUBAREA_PK PRIMARY KEY (subAreaId),
      CONSTRAINT SUBAREA_KNOWLEDGE_AREA_FK FOREIGN KEY (knowledgeAreaId)
        REFERENCES KNOWLEDGE_AREA (knowledgeAreaId),
      CONSTRAINT SUBAREA_UK UNIQUE (description, knowledgeAreaId)
    );

    CREATE TYPE stats_semester AS ENUM ('1', '2');

    CREATE TYPE stats_semester_status AS ENUM ('AD', 'CD');

    CREATE TABLE SEMESTER (
      semesterId SERIAL NOT NULL,
      subjectId SERIAL NOT NULL,
      year INT NOT NULL,
      semester stats_semester NOT NULL,
      status stats_semester_status,

      CONSTRAINT SEMESTER_PK PRIMARY KEY (semesterId),
      CONSTRAINT SEMESTRE_UK UNIQUE(year, semester, subjectId)
    );

    CREATE TABLE TEAM (
      teamId SERIAL NOT NULL,
      projectId SERIAL NOT NULL,
      semesterId SERIAL NOT NULL,

      CONSTRAINT TEAM_PK PRIMARY KEY (teamId),
      CONSTRAINT TEAM_PROJECT_FK FOREIGN KEY (projectId)
        REFERENCES PROJECT(projectId),
      CONSTRAINT TEAM_SEMESTER_FK FOREIGN KEY (semesterId)
        REFERENCES SEMESTER(semesterId) 
    );

    CREATE TYPE stats_post AS ENUM ('ED', 'NT', 'DP');

    CREATE TABLE POST(
      postId SERIAL NOT NULL,
      title VARCHAR(200) NOT NULL,
      hypertext VARCHAR(5000) NOT NULL,
      type stats_post NOT NULL,
      thumbnail BYTEA,
      author VARCHAR(200) NOT NULL,
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,

      CONSTRAINT POST_PK PRIMARY KEY (postId)
    );

    CREATE TABLE abstracts (
      keywordId SERIAL NOT NULL,
      projectId SERIAL NOT NULL,
      main BOOL DEFAULT FALSE NOT NULL,

      CONSTRAINT abstracts_KEYWORD_FK FOREIGN KEY (keywordId) 
        REFERENCES KEYWORD(keywordId),
      CONSTRAINT abstracts_PROJECT_FK FOREIGN KEY (projectId) 
        REFERENCES PROJECT(projectId)
    );

    CREATE TABLE summarize (
      keywordId SERIAL NOT NULL,
      subjectId SERIAL NOT NULL,

      CONSTRAINT summarize_KEYWORD_FK FOREIGN KEY (keywordId) 
        REFERENCES KEYWORD(keywordId),
      CONSTRAINT summarize_SUBJECT_FK FOREIGN KEY (subjectId) 
        REFERENCES SUBJECT(subjectId)
    );

    CREATE TABLE identifies (
      subAreaId SERIAL NOT NULL,
      subjectId SERIAL NOT NULL,

      CONSTRAINT identifies_SUBAREA_FK FOREIGN KEY (subAreaId)
        REFERENCES SUBAREA (subAreaId),
      CONSTRAINT identifies_SUBJECT_FK FOREIGN KEY (subjectId)
        REFERENCES SUBJECT (subjectId),
      CONSTRAINT identifies_UK UNIQUE (subAreaId, subjectId)
    );

    CREATE TABLE participate(
      teamId SERIAL NOT NULL,
      regNumber VARCHAR(9) NOT NULL,

      CONSTRAINT participate_TEAM_FK FOREIGN KEY (teamId)
        REFERENCES TEAM (teamId),
      CONSTRAINT participate_STUDENT_FK FOREIGN KEY (regNumber)
        REFERENCES STUDENT (regNumber)
    );

    CREATE TABLE is_registered(
      regNumber VARCHAR(9) NOT NULL,
      semesterId SERIAL NOT NULL,

      CONSTRAINT is_registered_STUDENT_FK FOREIGN KEY (regNumber)
        REFERENCES STUDENT(regNumber),
      CONSTRAINT is_registered_SEMESTER_FK FOREIGN KEY (semesterId)
        REFERENCES SEMESTER(semesterId)
    );

    CREATE TABLE lectures(
      regNumber VARCHAR(20) NOT NULL,
      semesterId SERIAL NOT NULL,

      CONSTRAINT lectures_PROFESSOR_FK FOREIGN KEY (regNumber)
        REFERENCES PROFESSOR(regNumber),
      CONSTRAINT lectures_semesterId FOREIGN KEY (semesterId)
        REFERENCES SEMESTER(semesterId)
    );
`,
});
