export const userTypes =[
    { id: 1, name: 'Super Admin' },
    { id: 2, name: 'Diplomat' },
    { id: 3, name: 'Service Provider' },
  ];

  export const level =[
    { id: 1, name: 'Beginner', description: 'Basic understanding' },
    { id: 2, name: 'Intermediate', description: 'Moderate understanding' },
    { id: 3, name: 'Advanced', description: 'High level of proficiency' },
    { id: 4, name: 'Fluent', description: 'Native or near-native proficiency' },
  ];

  export const language = [
    { id: 1, name: 'English', description: 'English language' },
    { id: 2, name: 'Spanish', description: 'Spanish language' },
    { id: 3, name: 'Chinese', description: 'Chinese language' },
    // Add all other languages here...
  ]

  export const yearsOfExperienceData = [
    {
      id: 1,
      name: 'Entry Level',
      description: '0-2 years of experience in the relevant field.',
      isActive: true,
    },
    {
      id: 2,
      name: 'Mid Level',
      description: '3-5 years of experience, with increasing responsibilities.',
      isActive: true,
    },
    {
      id: 3,
      name: 'Senior Level',
      description: '6-10 years of experience, with leadership roles and expert knowledge.',
      isActive: true,
    },
    {
      id: 4,
      name: 'Expert Level',
      description: 'Over 10 years of experience, with extensive expertise in the field.',
      isActive: true,
    },
    {
      id: 5,
      name: 'Internship',
      description: 'Limited or no professional experience, typically for interns or fresh graduates.',
      isActive: true,
    }
  ];
  

 export const memberships = [
    {
      name: 'Basic Plan',
      description: 'Access to basic features and limited content.',
      amount: 9.99,
      currency: 'USD',
      isActive: true,
    },
    {
      name: 'Premium Plan',
      description: 'Access to premium content and all features.',
      amount: 29.99,
      currency: 'USD',
      isActive: true,
    },
    {
      name: 'Family Plan',
      description: 'Allows up to 4 users with access to all features.',
      amount: 49.99,
      currency: 'USD',
      isActive: true,
    },
    {
      name: 'Student Plan',
      description: 'Discounted membership for students with valid ID.',
      amount: 14.99,
      currency: 'USD',
      isActive: true,
    },
    {
      name: 'Annual Plan',
      description: 'Yearly membership with a 20% discount on the monthly price.',
      amount: 99.99,
      currency: 'USD',
      isActive: true,
    },
  ];

  export const billingStatus = [
    {
      id: 1,
      name: 'Pending',
      description: 'Invoice is created and awaiting payment.',
      isActive: true,
    },
    {
      id: 2,
      name: 'Paid',
      description: 'Payment has been successfully completed.',
      isActive: true,
    },
    {
      id: 3,
      name: 'Failed',
      description: 'Payment attempt failed or was declined.',
      isActive: true,
    },
    {
      id: 4,
      name: 'Overdue',
      description: 'Payment was not made by the due date.',
      isActive: true,
    },
    {
      id: 5,
      name: 'Canceled',
      description: 'The invoice was canceled and no payment is required.',
      isActive: true,
    },
  ];