
export const mapDiplomatProfile = (user, diplomat) => {
    return {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      officialEmail: diplomat.officialEmail,
      profilePicture: user.profilePicture,
      displayName: user.displayName,
      displayEmail: user.displayEmail,
      isEmailVerified: user.isEmailVerified,
      isOfficialEmailVerified: diplomat.isOfficialEmailVerified,
      homeCountry: diplomat.homeCountry,
      assignedCountry: diplomat.assignedCountry,
      assignedCity: diplomat.assignedCity,
      roleId: diplomat.roleId,
      yearsOfExperience: diplomat.yearsOfExperience,
      yearsOfExperienceId: diplomat.yearsOfExperienceId,
      introduction: diplomat.introduction,
      vehicleTypeId: diplomat.vehicleTypeId,
      insuranceTypeId: diplomat.insuranceTypeId,
      chronicDiseasesId: diplomat.chronicDiseasesId,
      missionInstitutionId: diplomat.missionInstitutionId,
      isWithSpouse: diplomat.isWithSpouse,
      isWithChildren: diplomat.isWithChildren,
      isNeedHousingHelp: diplomat.isNeedHousingHelp,
      isWithPets: diplomat.isWithPets,
      isPlanAdoptingPets: diplomat.isPlanAdoptingPets,
      hobbies: diplomat.hobbies,
      createdAt: diplomat.createdAt,
      updatedAt: diplomat.updatedAt,
      currentOnboardingStep: diplomat.currentOnboardingStep,
      languageSkills: diplomat.languageSkills,
      customRole: diplomat.customRole,
      dateFormat: user.dateFormat,
      timeFormat: user.timeFormat,
      timezone: user.timezone,
      role: diplomat.role,
      missionInstitution: diplomat.missionInstitution,
      vehicleType: diplomat.vehicleType,
      insuranceType: diplomat.insuranceType,
      chronicDiseases: diplomat.chronicDiseases,
    };
};
