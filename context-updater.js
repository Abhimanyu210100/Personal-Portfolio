// Context Updater Helper
// Use this to easily update your context data

class ContextUpdater {
    constructor() {
        this.context = window.ABHIMANYU_CONTEXT;
    }

    // Update personal information
    updatePersonal(name, title, email, linkedin, location) {
        this.context.personal = {
            name: name || this.context.personal.name,
            title: title || this.context.personal.title,
            email: email || this.context.personal.email,
            linkedin: linkedin || this.context.personal.linkedin,
            location: location || this.context.personal.location
        };
        console.log('✅ Personal information updated');
    }

    // Update current role
    updateCurrentRole(position, company, duration, department, focus) {
        this.context.currentRole = {
            position: position || this.context.currentRole.position,
            company: company || this.context.currentRole.company,
            duration: duration || this.context.currentRole.duration,
            department: department || this.context.currentRole.department,
            focus: focus || this.context.currentRole.focus
        };
        console.log('✅ Current role updated');
    }

    // Add new experience
    addExperience(role, company, duration, achievements) {
        this.context.experience.unshift({
            role: role,
            company: company,
            duration: duration,
            achievements: achievements
        });
        console.log('✅ New experience added');
    }

    // Add new project
    addProject(name, description, impact, technologies) {
        this.context.projects.push({
            name: name,
            description: description,
            impact: impact,
            technologies: technologies
        });
        console.log('✅ New project added');
    }

    // Add new award
    addAward(name, organization, year, description) {
        this.context.awards.push({
            name: name,
            organization: organization,
            year: year,
            description: description
        });
        console.log('✅ New award added');
    }

    // Add new publication
    addPublication(title, journal, year, type) {
        this.context.publications.push({
            title: title,
            journal: journal,
            year: year,
            type: type
        });
        console.log('✅ New publication added');
    }

    // Update skills
    updateSkills(category, skills) {
        if (this.context.skills[category]) {
            this.context.skills[category] = skills;
            console.log(`✅ ${category} skills updated`);
        } else {
            console.log('❌ Invalid skill category. Available categories:', Object.keys(this.context.skills));
        }
    }

    // Add expertise area
    addExpertise(area) {
        if (!this.context.expertise.includes(area)) {
            this.context.expertise.push(area);
            console.log('✅ New expertise area added');
        } else {
            console.log('❌ Expertise area already exists');
        }
    }

    // Update contact preferences
    updateContact(preferredMethod, availability, interests) {
        this.context.contact = {
            preferredMethod: preferredMethod || this.context.contact.preferredMethod,
            availability: availability || this.context.contact.availability,
            interests: interests || this.context.contact.interests
        };
        console.log('✅ Contact preferences updated');
    }

    // Get current context
    getContext() {
        return this.context;
    }

    // Save context to localStorage
    saveContext() {
        localStorage.setItem('abhimanyuContext', JSON.stringify(this.context));
        console.log('✅ Context saved to localStorage');
    }

    // Load context from localStorage
    loadContext() {
        const saved = localStorage.getItem('abhimanyuContext');
        if (saved) {
            this.context = JSON.parse(saved);
            window.ABHIMANYU_CONTEXT = this.context;
            console.log('✅ Context loaded from localStorage');
        }
    }

    // Reset to default context
    resetContext() {
        // This would reload the original context-data.js
        location.reload();
        console.log('✅ Context reset to default');
    }
}

// Usage examples
console.log(`
🔧 Context Updater Helper
========================

Available methods:

1. Update personal info:
   contextUpdater.updatePersonal('Your Name', 'Your Title', 'your@email.com', 'linkedin-url', 'Location');

2. Add new experience:
   contextUpdater.addExperience('Role', 'Company', 'Duration', ['Achievement 1', 'Achievement 2']);

3. Add new project:
   contextUpdater.addProject('Project Name', 'Description', 'Impact', ['Tech1', 'Tech2']);

4. Add new award:
   contextUpdater.addAward('Award Name', 'Organization', 'Year', 'Description');

5. Update skills:
   contextUpdater.updateSkills('programming', ['Python', 'R', 'SQL']);

6. Save changes:
   contextUpdater.saveContext();

Example:
contextUpdater.addExperience('Senior Data Scientist', 'Tech Company', '2024 - Present', ['Led ML team', 'Improved accuracy by 20%']);
contextUpdater.saveContext();
`);

// Create updater instance
const contextUpdater = new ContextUpdater(); 