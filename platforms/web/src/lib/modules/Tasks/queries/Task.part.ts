// Exporting Task part query
export const TaskPart = `
  _id
  title
  subtitle
  sessions {
    _id
    startDate
    endDate
  }
  parent {
    __typename
    ...on User {
      _id
    }
    ...on Collection {
      _id
    }
    ...on Task {
      _id
    }
  }
`;
