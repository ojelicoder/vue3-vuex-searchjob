export const cityList = (state) => state.cityList;

export const jobList = (state) => state.jobList;

export const jobDetail = (state) => state.jobDetail;

export const loadingStatus = (state) => state.loading;

export const search = (state) => state.searchData;

export const searchJob = (state) => {
  const { searchData } = state;

  const lowerCaseData = {
    city: searchData?.city?.toLowerCase(),
    job: searchData?.job?.toLowerCase(),
  };

  let filteredJob;

  if (searchData.city === "" && searchData.job === "") {
    filteredJob = state.jobList;
  } else if (searchData.city === "" && searchData.job !== "") {
    filteredJob = state.jobList?.filter((job) => {
      return job.positionName.toLowerCase().includes(lowerCaseData.job);
    });
  } else if (searchData?.city !== "" && searchData?.job === "") {
    filteredJob = state.jobList.filter((job) => {
      return job?.cityName?.toLowerCase().includes(lowerCaseData.city);
    });
  } else {
    filteredJob = state.jobList.filter((job) => {
      return (
        job.cityName.toLowerCase().includes(lowerCaseData.city) &&
        job.positionName.toLowerCase().includes(lowerCaseData.job)
      );
    });
  }
  return filteredJob;
};

export const pagination = (state) => state.pagination;
