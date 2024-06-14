import { ResDataStates, ResultStatus } from '../components/SearchProvider';

export const checkResultStatus = (resDataStates: ResDataStates): ResultStatus => {
  const values = Object.values(resDataStates);
  let resultState: ResultStatus = 'init';
  let hasDataCount = 0;
  let noDataCount = 0;
  Object.values(resDataStates).forEach((s) => {
    if (s) {
      hasDataCount++;
    } else {
      if (s === false) {
        noDataCount++;
      }
    }
  });

  if (hasDataCount === values.length) {
    resultState = 'hasData';
  }

  if (noDataCount === values.length) {
    resultState = 'noData';
  }

  return resultState;
};
