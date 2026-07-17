# AndriWulandika.uk - AI Team System

## 🎯 Project Overview

This is an **AI-Powered Digital Services Platform** built on Claude AI, where AI agents handle 80-100% of service delivery, and Andri provides quality control, client management, and business development.

**Vision:** Build a scalable, high-margin service business that leverages Claude AI to deliver knowledge-based services without hiring large teams.

---

## 📦 Core Services

1. **AI Writing Studio**
   - Corporate Documents (Proposals, Company Profiles, Business Plans, SOPs)
   - Government Documents (RPJMD, Renstra, compliance docs)
   - Marketing Content (Articles, Copywriting, Presentations)

2. **Government Document Services**
   - Strategic Planning Docs (RPJPD, RPJMD, RKPD, Renstra, Renja)
   - Performance Reports (LKPJ, LPPD)
   - Compliance Documents (SAKIP, SSH, HSPK, ASB, SPM)

3. **AI Social Media Management**
   - Content Planning & Calendar
   - Caption Writing & Hashtag Research
   - Design Briefs for Canva
   - Post Scheduling & Automation
   - Monthly Analytics Reports

4. **Website Content Development**
   - Landing Pages, Service Pages
   - Blog & SEO Content
   - FAQ & Documentation

5. **AI Research & Data Analysis**
   - Market Research Reports
   - Competitive Intelligence
   - Data Visualization & Dashboards

6. **Knowledge Management Systems**
   - Custom Knowledge Base Setup
   - Training Documentation
   - SOP Digitalization

7. **AI Integration & Automation Consulting**
   - Workflow Design (n8n, Make, Zapier)
   - WhatsApp & Email Automation
   - Digital Transformation Roadmap

---

## 🤖 AI Team Architecture

### Specialist Agents

- **Project Manager Agent**: Intake, coordination, timeline management
- **Content Writer Agent**: Proposals, articles, copywriting
- **Government Documents Specialist**: RPJMD, compliance, legal checks
- **Social Media Manager Agent**: Content planning, captions, scheduling
- **Researcher Agent**: Market analysis, competitive intelligence
- **Designer Coordinator Agent**: Canva briefs, visual direction
- **QA Agent**: Quality review, compliance validation
- **Learning Agent**: Feedback analysis, prompt improvement

### Supporting Systems

- **MCP Server**: Templates, tools, validators
- **n8n Workflows**: Automation pipelines
- **Web Portal**: Client & admin interface
- **Vector Database**: Learning & feedback storage

---

## 🛠️ Available Skills

### Master Control
- `/ai-team-coordinator` - Main orchestrator for AI Team operations

### Service-Specific
- `/service-router` - Route client requests to appropriate agent
- `/content-generator` - Generate all written content
- `/social-media-manager` - Content planning, captions, automation
- `/compliance-checker` - Validate government documents
- `/qa-reviewer` - Quality assurance & feedback

### Management
- `/project-tracker` - Track projects & timelines
- `/prompt-engineer` - Optimize & test prompts

---

## 📋 Workflow: From Client Request to Delivery

```
Client Request
    ↓
[/service-router] → Determine service type
    ↓
[/project-tracker] → Create project record
    ↓
Specialist Agent Execution (parallel)
├── [/content-generator] for writing
├── [/social-media-manager] for SM content
├── [/compliance-checker] for gov docs
└── [/qa-reviewer] reviews output
    ↓
Andri Review Portal
├── Approve ✓
├── Request Changes
└── Provide Feedback
    ↓
[/project-tracker] → Update status
    ↓
Automated Delivery
└── Format → Send → Archive
```

---

## 🔧 MCP Server

### Available Tools
- **Template Library**: All document/content templates
- **Compliance Checker**: Government document validation
- **Brand Validator**: Tone & consistency checker
- **Content Calendar Manager**: Schedule management
- **Social Media Scheduler**: Post automation
- **Document Formatter**: Format to PDF/Word
- **Analytics Tracker**: Performance metrics

### Location
`/home/user/andriwulandika/mcp-servers/andriwulandika-mcp/`

---

## 🚀 Quick Start

### 1. Route a Client Service Request
```
/service-router
→ Describe what service client needs
→ AI Team auto-routes to appropriate agent
```

### 2. Generate Content
```
/content-generator
→ Specify type (proposal, article, etc)
→ Provide requirements
→ Get generated content
```

### 3. Manage Social Media
```
/social-media-manager
→ Plan content calendar
→ Generate captions & hashtags
→ Brief designer for visuals
```

### 4. Review & QA
```
/qa-reviewer
→ Paste content to review
→ Get quality assessment
→ Improve based on feedback
```

### 5. Track Progress
```
/project-tracker
→ View all active projects
→ Check timelines
→ Update status
```

---

## 📊 Metrics & KPIs

Track these for business health:
- **Delivery Time**: Avg days per project
- **Quality Score**: QA approval rate
- **Client Satisfaction**: Feedback ratings
- **Revision Cycles**: Avg revisions per project
- **Revenue per Project**: Average project value
- **Monthly Volume**: Projects completed/month

---

## 🔐 Quality Standards

### Content Quality
- ✓ Grammar & spelling
- ✓ Brand voice consistency
- ✓ Clarity & readability
- ✓ Structure & formatting

### Government Documents
- ✓ Regulatory compliance
- ✓ Format adherence
- ✓ Terminology accuracy
- ✓ Signature/approval readiness

### Social Media Content
- ✓ Engagement optimization
- ✓ Trending topic awareness
- ✓ Visual brief clarity
- ✓ Caption relevance

---

## 🔄 Continuous Improvement

The AI Team learns from every project:

1. **Feedback Collection**: Client & Andri feedback stored
2. **Analysis**: Learning Agent identifies patterns
3. **Prompt Optimization**: Improve specialist prompts
4. **Template Updates**: Refine templates based on performance
5. **Knowledge Building**: Expand template library

---

## 📝 Project Status

- [ ] MCP Server Setup
- [ ] Agent Prompts Created
- [ ] n8n Workflows Designed
- [ ] Web Portal Built
- [ ] First 5 Pilot Projects
- [ ] Feedback & Refinement
- [ ] Public Launch

---

## 🎓 Learning Resources

- [Claude API Documentation](https://docs.anthropic.com)
- [MCP Protocol Guide](https://modelcontextprotocol.io)
- [n8n Workflow Tutorial](https://docs.n8n.io)
- [Prompt Engineering Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

---

**Owner**: Andri Wulandika  
**Contact**: wulandikaandri@gmail.com  
**Website**: andriwulandika.uk  
**Last Updated**: 2026-07-17
