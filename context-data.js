// Context Data for Abhimanyu's AI Assistant
// Update this file with your personal information

const ABHIMANYU_CONTEXT = {
    // Basic Information
    personal: {
        name: "Abhimanyu Swaroop",
        title: "Data Scientist & AI Engineer",
        email: "abhiswaroop210100@gmail.com",
        linkedin: "https://www.linkedin.com/in/abhimanyuswaroop",
        location: "United States"
    },

    // Current Role
    currentRole: {
        position: "Data Scientist",
        company: "CVS Health",
        duration: "2023 - Present",
        department: "Healthcare Analytics",
        focus: "Healthcare analytics, GenAI, and large language models"
    },

    // Education
    education: [
        {
            degree: "Master's in Data Science",
            institution: "Columbia University",
            year: "2022",
            focus: "Applied analytics and machine learning"
        },
        {
            degree: "Bachelor's in Engineering Materials Science",
            institution: "IIT Madras",
            year: "2020",
            focus: "Materials science and engineering"
        }
    ],

    // Work Experience
    experience: [
        {
            role: "Data Scientist",
            company: "CVS Health",
            duration: "2023 - Present",
            achievements: [
                "Saved $9.6M by optimizing overpayment detection algorithms in healthcare claims",
                "Built a 0→1 data pipeline combining structured and unstructured data; added $3M/year and won Excellence Award",
                "Used LLMs and GenAI to auto-generate SQL/Python from healthcare docs, reducing SME involvement"
            ]
        },
        {
            role: "Data Analyst",
            company: "DIA Ventures",
            duration: "2023",
            achievements: [
                "Engineered a hybrid ML framework combining regression and classification to estimate credit recovery",
                "Built clustering models to segment credit card audiences across partner ecosystems"
            ]
        },
        {
            role: "Data Science Intern",
            company: "Novelis Inc.",
            duration: "2022",
            achievements: [
                "Deployed computer vision pipelines to track and measure product dimensions in real-time using live plant video streams",
                "Automated CI/CD on Databricks using GitHub Actions; saved 12–16 hours/week",
                "Cut Spark query runtimes by 84% through optimization and profiling"
            ]
        },
        {
            role: "Teaching Assistant",
            company: "Columbia University",
            duration: "2022",
            achievements: [
                "Led recitations and office hours for 120+ graduate students in Data Visualization",
                "Collaborated with faculty to refine curriculum for analytical communication and social science data interpretation"
            ]
        },
        {
            role: "Undergraduate Researcher",
            company: "IIT Madras",
            duration: "2020 - 2021",
            achievements: [
                "Simulated optical properties of nanoparticles using novel approximation algorithm; RMSE ranged from 0.01–0.06",
                "Published research in Materialia exploring plasmonic nanoparticle behavior in solar energy devices",
                "Mentored a six-member team on modeling techniques and scientific publishing"
            ]
        },
        {
            role: "Machine Learning Intern",
            company: "University of Michigan",
            duration: "2020",
            achievements: [
                "Achieved R² = 0.96 using convolutional neural networks (CNNs) for material property prediction from atomic structure features",
                "Executed 1800+ ab initio energy simulations across 10 alloy families to curate a robust training dataset"
            ]
        },
        {
            role: "Undergraduate Researcher",
            company: "IIT Madras",
            duration: "2019 - 2020",
            achievements: [
                "Trained a Random Forest Classifier with tuned hyperparameters to reach 86% accuracy on microscopy image-based predictions",
                "First-authored a peer-reviewed paper in Computational Materials Science on data-driven sintering behavior prediction"
            ]
        }
    ],

    // Technical Skills
    skills: {
        programming: ["Python", "R", "SQL", "JavaScript", "Java"],
        machineLearning: ["TensorFlow", "PyTorch", "Scikit-learn", "Large Language Models", "Generative AI", "NLP"],
        bigData: ["AWS", "Apache Spark", "Hadoop", "Kubernetes", "Docker"],
        analytics: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Plotly"],
        healthcare: ["Clinical Data", "Claims Analysis", "Risk Modeling", "Predictive Analytics"],
        tools: ["Git", "Jupyter", "Databricks", "Airflow", "MLflow"]
    },

    // Key Projects
    projects: [
        {
            name: "Healthcare Claims Optimization",
            description: "Saved $9.6M by optimizing overpayment detection algorithms in healthcare claims",
            impact: "Major cost savings and operational efficiency improvement",
            technologies: ["Python", "Machine Learning", "Healthcare Analytics"]
        },
        {
            name: "0-1 Data Pipeline Development",
            description: "Built end-to-end pipeline combining structured and unstructured data",
            impact: "Added $3M/year revenue, won Excellence Award",
            technologies: ["Big Data", "ETL", "Data Engineering"]
        },
        {
            name: "GenAI Code Generation",
            description: "Applied LLMs to auto-generate SQL/Python from healthcare documents",
            impact: "Reduced SME involvement, accelerated development cycles",
            technologies: ["Large Language Models", "GenAI", "NLP"]
        },
        {
            name: "Credit Recovery ML Framework",
            description: "Engineered hybrid ML framework combining regression and classification",
            impact: "Improved credit recovery estimation",
            technologies: ["Machine Learning", "Regression", "Classification"]
        },
        {
            name: "Computer Vision Pipeline",
            description: "Deployed real-time computer vision for product dimension tracking",
            impact: "Automated quality control processes",
            technologies: ["Computer Vision", "Real-time Processing", "Python"]
        }
    ],

    // Awards & Recognition
    awards: [
        {
            name: "Premier Award",
            organization: "CVS Health",
            year: "2023",
            description: "Recognized for leading technical development for claims prioritization model that streamlined audits and drove $3M in annual medical cost savings"
        },
        {
            name: "B.Krishnamurthy Award",
            organization: "IIT Madras",
            year: "2020",
            description: "Best Bachelors Thesis in Metallurgical and Materials Engineering"
        },
        {
            name: "Vijay Jagannathan Award",
            organization: "IIT Madras",
            year: "2020",
            description: "Award for the best academic performance in graduating batch for Metallurgical and Materials Engineering curriculum"
        }
    ],

    // Research Publications
    publications: [
        {
            title: "Data-driven sintering behavior prediction",
            journal: "Computational Materials Science",
            year: "2020",
            type: "First-authored peer-reviewed paper"
        },
        {
            title: "Plasmonic nanoparticle behavior in solar energy devices",
            journal: "Materialia",
            year: "2021",
            type: "Research publication"
        }
    ],

    // Areas of Expertise
    expertise: [
        "Healthcare Analytics",
        "Generative AI",
        "Large Language Models",
        "Machine Learning",
        "Data Engineering",
        "Big Data Systems",
        "Predictive Analytics",
        "Risk Modeling"
    ],

    // Contact Preferences
    contact: {
        preferredMethod: "LinkedIn or email",
        availability: "Open to discussing data science, AI, and healthcare technology opportunities",
        interests: "Data science, AI, healthcare technology, new opportunities"
    }
};

// Export for use in other files
window.ABHIMANYU_CONTEXT = ABHIMANYU_CONTEXT; 