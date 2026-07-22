# ADR-001: CI/CD Platform Selection

## Status
Accepted

## Context

The Enterprise DevOps Platform requires an automated CI/CD solution for:

- Source code integration
- Automated builds
- Unit testing
- Security scanning
- Docker image creation
- Container registry integration
- Deployment automation
- Environment promotion
- Production release controls

The following CI/CD platforms were evaluated:

1. GitHub Actions
2. Jenkins
3. GitLab CI/CD

---

## Option 1: GitHub Actions

### Advantages

- Native integration with GitHub repositories
- YAML-based workflows stored with source code
- No CI controller infrastructure to maintain
- Hosted and self-hosted runners available
- Strong marketplace ecosystem
- Good integration with Docker and cloud platforms
- Supports OIDC-based cloud authentication
- Suitable for CI and automation workflows

### Disadvantages

- Workflow complexity can increase in large environments
- GitHub ecosystem dependency
- Hosted runner usage may introduce cost at scale

---

## Option 2: Jenkins

### Advantages

- Mature and widely used CI/CD platform
- Highly customizable
- Large plugin ecosystem
- Supports complex enterprise pipelines
- Can run completely self-hosted

### Disadvantages

- Jenkins controller and agents require management
- Plugin maintenance and compatibility risks
- Infrastructure patching and upgrades required
- Additional security and operational overhead

---

## Option 3: GitLab CI/CD

### Advantages

- Strong native integration with GitLab
- Built-in CI/CD capabilities
- Integrated container registry options
- Good DevSecOps features

### Disadvantages

- Best suited when GitLab is the primary SCM platform
- Our project source control strategy is based on GitHub
- Migration would introduce unnecessary platform complexity

---

## Decision

GitHub Actions will be used as the primary CI platform for the Enterprise DevOps Platform.

Primary reasons:

- Source code will be hosted on GitHub
- Native repository integration
- Reduced CI infrastructure management
- YAML-based pipeline-as-code
- Strong integration with Docker, security tooling, and cloud platforms

Jenkins will be studied separately through hands-on labs to understand enterprise Jenkins architecture, controllers, agents, Jenkinsfiles, credentials, plugins, and troubleshooting.

GitLab CI/CD will be studied conceptually for interview and platform-comparison knowledge.

---

## Initial CI/CD Architecture

Developer
    |
    v
GitHub Repository
    |
    v
GitHub Actions
    |
    +--> Build
    |
    +--> Unit Tests
    |
    +--> Security Scanning
    |
    +--> Docker Image Build
    |
    v
Container Registry
    |
    v
Deployment Platform

---

## Future GitOps Architecture

GitHub Application Repository
    |
    v
GitHub Actions CI
    |
    v
Container Registry
    |
    v
GitOps Configuration
    |
    v
Argo CD
    |
    v
Kubernetes Cluster

---

## Production Considerations

- Secrets must not be stored directly in workflow files.
- GitHub Secrets or OIDC-based authentication should be used.
- Production deployments should have controlled approvals.
- CI pipelines should fail when mandatory tests or security checks fail.
- Docker images should use immutable version tags.
- Production deployment should support rollback.
- Least-privilege permissions should be applied to workflows.
- CI and CD responsibilities should remain clearly separated where appropriate.

---

## Consequences

### Positive

- Reduced CI infrastructure management
- Faster pipeline implementation
- Native GitHub integration
- Easier pipeline-as-code management

### Negative

- Increased dependency on GitHub
- Complex workflows may require reusable workflows or custom actions
- Runner security must be considered when using self-hosted runners

---

## Interview Summary

We evaluated Jenkins, GitHub Actions, and GitLab CI/CD.

Because our source code was hosted on GitHub and we wanted to reduce CI infrastructure operational overhead, we selected GitHub Actions as the primary CI platform.

The pipeline is responsible for build, test, security validation, and container image creation.

For Kubernetes deployments, the target architecture evolves toward GitOps, where CI publishes immutable artifacts and Argo CD manages deployment state in the Kubernetes cluster.

Jenkins knowledge is maintained separately because many enterprise environments still use Jenkins for complex and legacy CI/CD workloads.
