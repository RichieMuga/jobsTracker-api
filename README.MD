#Jobs tracker api

## Introduction
Designed to enhance the efficiency of job-related processes, this API offers a robust set of functionalities to seamlessly integrate job tracking into your applications. 

## Motivation
I was motivated by a commitment to simplifying job tracking.

## Project Setup

In order to spin up the project, in the root create .env with these two variables, with your own values.

MONGO_URI
JWT_SECRET

After that run this command

```bash
npm install && npm start
```

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
