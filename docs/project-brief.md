# Software Delivery Planner — Project Brief v0

## 1. Project Name

**Software Delivery Planner**

Working title for a portfolio-grade full-stack web application designed to support the planning, tracking and analysis of a small software delivery project.

## 2. Project Purpose

The goal of this project is to build a practical web application that demonstrates both technical full-stack skills and a structured approach to software delivery.

The application will allow a user to define a software project, break it down into features and tasks, estimate work, track actual effort, monitor risks and visualize basic delivery KPIs.

This project is intended as a portfolio application, not as a full Jira/Asana replacement. Its value is to show how software planning, delivery awareness, technical implementation, testing and maintainability can be connected in a single coherent workflow.

## 3. Professional Goal

This project is designed to support a professional positioning that bridges software development and technical delivery.

It should demonstrate:

* full-stack development skills with **React, Node.js and TypeScript**;
* API design and backend implementation;
* frontend state and UI management;
* automated testing, including end-to-end testing;
* ability to structure a software project from analysis to delivery;
* attention to maintainability, technical debt, estimation, risks and KPIs;
* AI-assisted development through small, controlled and reviewable tasks.

## 4. Target Users

The primary target user is a technical professional or small delivery team that wants to plan and monitor a lightweight software project.

Possible user profiles:

* Technical Project Coordinator;
* Delivery Manager;
* Scrum Master / Agile Delivery profile;
* Tech Lead;
* solo developer managing a structured project;
* small software team needing simple planning and tracking.

## 5. Problem Statement

Small software projects often start directly from implementation without enough structure around scope, estimates, risks and delivery metrics.

This can lead to:

* unclear priorities;
* underestimated tasks;
* poor visibility on progress;
* unmanaged technical debt;
* difficulty involving new team members;
* weak connection between business goals and technical execution;
* lack of objective data to improve future estimates.

The application aims to address this by providing a simple but structured way to define, plan, track and measure a software project.

## 6. Product Vision

The application should help answer questions such as:

* What is the project goal?
* Which features are part of the MVP?
* Which tasks are planned for each feature or sprint?
* How accurate were the initial estimates?
* Which areas consumed more time than expected?
* Which risks are still open?
* Is the project progressing according to expectations?
* Which insights can improve future planning?

## 7. MVP Scope

The first version will focus on a single-project workflow.

The MVP should include:

### Project Setup

The user can create and view a software project with basic information:

* name;
* description;
* business goal;
* start date;
* target end date;
* team size;
* estimated total effort;
* project status.

### Feature and Task Management

The user can define features and related tasks.

Each task should include:

* title;
* description;
* type;
* priority;
* estimated hours;
* actual hours;
* status;
* related feature or sprint;
* notes.

### Sprint or Phase Planning

The user can organize tasks into simple sprints or delivery phases.

Each sprint/phase should include:

* name;
* goal;
* start date;
* end date;
* available capacity;
* planned effort;
* completion status.

### Risk Register

The user can record basic project risks.

Each risk should include:

* title;
* description;
* probability;
* impact;
* mitigation;
* status.

### KPI Dashboard

The application should display basic delivery KPIs:

* estimated vs actual hours;
* task completion rate;
* sprint capacity usage;
* task distribution by type;
* open risks by severity;
* variance between planned and actual effort.

## 8. Out of Scope for v1

The first version will not include:

* authentication and user accounts;
* complex role-based permissions;
* real multi-user collaboration;
* drag-and-drop Kanban board;
* advanced reporting;
* real-time updates;
* external integrations;
* AI-generated backlog;
* cloud deployment automation;
* mobile application;
* advanced financial/budget module.

These items may be documented as future improvements.

## 9. Technical Scope

The initial technical stack should include:

* **React + TypeScript** for the frontend;
* **Node.js + TypeScript** for the backend;
* REST API;
* OpenAPI/Swagger documentation;
* shared types or DTOs where useful;
* validation layer;
* lightweight persistence layer;
* unit/integration tests;
* Playwright end-to-end tests;
* GitHub Actions for CI;
* Markdown documentation inside the repository.

## 10. Delivery Method

The project will be developed using a controlled AI-assisted workflow.

The development process will follow these principles:

* start from project definition and feature analysis before writing code;
* work by vertical slices, not by large uncontrolled code generation;
* each feature must have clear acceptance criteria;
* each AI task must be small, scoped and reviewable;
* the AI should modify only the files required for the current task;
* tests should be added or updated for each meaningful behavior change;
* human review is required before moving to the next step;
* estimated time and actual time should be tracked for each task;
* documentation should evolve together with the code.

## 11. Success Criteria

The project will be considered successful when it provides:

* a working full-stack application;
* clear React/Node/TypeScript architecture;
* documented REST API;
* meaningful automated tests;
* at least one Playwright end-to-end flow;
* a dashboard with delivery KPIs;
* structured project documentation;
* visible evidence of planning, implementation and review;
* a clean GitHub repository suitable for portfolio use.

## 12. Portfolio Message

This project should communicate the following professional message:

> I can build software, but I can also reason about how software should be planned, structured, measured and delivered. My technical background allows me to understand implementation details, while my delivery-oriented approach helps reduce risks, improve maintainability and connect technical work with project goals.

## 13. Initial Project Status

Status: **Definition phase**

Next step: define the MVP feature map and break the project into implementation-ready feature slices.
