import React from 'react';
import RatingCell from '../CellTemplate/RatingCell';

export const dataModel = {
  headers: [
    //  {
    //    title: 'Id',
    //    accessor: 'id',
    //    index: 0,
    //    dataType: 'number',
    //  },
    {
      title: 'Profile',
      accessor: 'profile',
      width: '80px',
      index: 1,
      cell: {
        type: 'image',
        style: {
          width: '50px',
        },
      },
    },
    {
      title: 'Name',
      accessor: 'name',
      width: '300px',
      index: 2,
      dataType: 'string',
    },
    {
      title: 'Age',
      accessor: 'age',
      index: 3,
      dataType: 'number',
    },
    {
      title: 'Qualification',
      accessor: 'qualification',
      index: 4,
      dataType: 'number',
    },
    {
      title: 'Rating',
      accessor: 'rating',
      index: 5,
      width: '200px',
      cell: (row) => <RatingCell row={row} />,
    },
  ],
  data: [
    {
      id: 1,
      name: 'a',
      age: 29,
      qualification: 'B.Com',
      rating: 3,
      profile:
        'https://cdn1.vectorstock.com/i/1000x1000/19/45/user-avatar-icon-sign-symbol-vector-4001945.jpg',
    },
    {
      id: 2,
      name: 'b',
      age: 35,
      qualification: 'B.Sc',
      rating: 5,
      profile:
        'https://cdn1.vectorstock.com/i/1000x1000/19/45/user-avatar-icon-sign-symbol-vector-4001945.jpg',
    },
    {
      id: 3,
      name: 'c',
      age: 42,
      qualification: 'B.E',
      rating: 3,
      profile:
        'https://cdn1.vectorstock.com/i/1000x1000/19/45/user-avatar-icon-sign-symbol-vector-4001945.jpg',
    },
  ],
};

for (let i = 4; i <= 20; i++) {
  dataModel.data.push({
    id: i,
    name: 'name-' + i,
    age: i + 18,
    qualification: 'Graduate',
    rating: i % 2 ? 3 : 4,
    profile:
      'https://cdn1.vectorstock.com/i/1000x1000/19/45/user-avatar-icon-sign-symbol-vector-4001945.jpg',
  });
}
