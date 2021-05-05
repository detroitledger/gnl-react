import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import OrgLink from '../components/OrgLink';

const LIST_PDFS_QUERY = gql`
  query pdfs {
    pdfs(limit: 9999, limitToCurrentUser: false) {
      organization {
        name
        uuid
      }
      user {
        uuid
        name
      }
      url
      uuid
      year
      done
    }
  }
`;

const ListPdfs = () => {
  const { loading, error, data } = useQuery(LIST_PDFS_QUERY);

  if (loading) return <>Loading...</>;

  if (error) throw new Error('todo catch these?');

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Organization</th>
          <th>PDF URL</th>
          <th>Year</th>
          <th>Done?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.pdfs.map(({ url, uuid, year, done, organization, user }) => (
          <tr key={uuid}>
            <td>{user ? user.name : '-'}</td>
            <td>
              <OrgLink name={organization.name} uuid={organization.uuid} />
            </td>
            <td>
              <a href={url}>{url}</a>
            </td>
            <td>{year}</td>
            <td>{done ? '✔️' : ''}</td>
            <td>
              <Link to={`/admin/pdfs/${uuid}`}>edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListPdfs;
