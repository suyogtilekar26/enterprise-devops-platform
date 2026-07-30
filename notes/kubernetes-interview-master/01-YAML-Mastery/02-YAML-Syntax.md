# Kubernetes Interview Master Handbook

# Chapter 02 - YAML Syntax

---

# Introduction

Before writing Kubernetes YAML, you must understand YAML syntax.

Most production deployment failures happen because of YAML syntax mistakes.

---

# What is YAML Syntax?

YAML is indentation based.

It does NOT use {}

It does NOT use ;

It does NOT use ()

Everything depends on spacing.

---

# Marathi

YAML मध्ये सर्वात महत्त्वाची गोष्ट म्हणजे Indentation.

जर spacing चुकीची असेल तर Kubernetes YAML parse करू शकत नाही.

---

# Rule 1

Use spaces.

Never use TAB.

Correct

name: frontend

Wrong

<TAB>name: frontend

---

# Rule 2

Child values should be indented.

Correct

metadata:
  name: frontend

Wrong

metadata:
name: frontend

---

# Rule 3

List starts with '-'

containers:
  - name: nginx
    image: nginx

Another Example

ports:
  - containerPort: 80
  - containerPort: 443

---

# Rule 4

Key Value Format

image: nginx

replicas: 2

namespace: production

---

# Rule 5

Comments

# This is a comment

Comments are ignored by Kubernetes.

---

# Rule 6

Strings

name: frontend

version: "1.0"

cpu: "100m"

memory: "128Mi"

---

# Rule 7

Boolean

enabled: true

debug: false

---

# Rule 8

Nested Objects

resources:
  requests:
    cpu: "100m"
    memory: "128Mi"

  limits:
    cpu: "250m"
    memory: "256Mi"

---

# Complete Example

apiVersion: apps/v1

kind: Deployment

metadata:
  name: frontend

spec:
  replicas: 2

---

# Common Errors

Using TAB

Wrong Indentation

Missing :

Wrong List Format

Incorrect Spacing

---

# Production Example

Developer changes

metadata:
 name: frontend

instead of

metadata:
  name: frontend

Deployment fails.

CI Pipeline stops.

Production deployment blocked.

---

# Troubleshooting

kubectl apply -f deployment.yaml

Error

mapping values are not allowed

Usually means

Wrong indentation

Missing colon

Wrong spacing

---

# Interview Questions

Q1 Why YAML is indentation sensitive?

Answer

Because YAML uses whitespace to represent hierarchy.

---

Q2 Can we use TAB?

Answer

No.

Only spaces should be used.

---

Q3 Why YAML is preferred in Kubernetes?

Answer

It is human readable, declarative and Git friendly.

---

# Best Practices

Always use 2 spaces.

Never use TAB.

Validate YAML before commit.

Store YAML in Git.

Review YAML using Pull Request.

---

# Cheat Sheet

✔ YAML is indentation based

✔ Always use spaces

✔ Lists start with '-'

✔ Key : Value

✔ Never use TAB

✔ Validate before deployment

