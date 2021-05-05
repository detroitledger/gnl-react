import React from 'react';
import { string } from 'prop-types';

import { useParams } from 'react-router-dom';

import { gql, useMutation, useQuery } from '@apollo/client';

import PdfForm from '../components/PdfForm';

const GET_PDF = gql`
  query getPdf($uuid: String) {
    pdf(uuid: $uuid) {
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

const UPDATE_PDF = gql`
  mutation updatePdf($input: PdfInput!) {
    upsertPdf(input: $input) {
      uuid
    }
  }
`;

const EditPdf = () => {
  const { uuid } = useParams();

  const { loading, error, data } = useQuery(GET_PDF, {
    variables: { uuid },
  });

  const [
    updatePdf,
    { loading: updatePdfLoading, error: updatePdfError, data: updatePdfData },
  ] = useMutation(UPDATE_PDF);

  if (loading) return <>Loading...</>;

  if (error) throw new Error('todo catch these?');

  const updateError = updatePdfError && <p>{updatePdfError.message}</p>;
  const updated = updatePdfData && <p>Updated PDF</p>;

  const onSubmit = (input) => {
    updatePdf({
      variables: {
        input: { ...input, uuid },
      },
    });
  };

  return (
    <>
      <PdfForm defaultValues={data.pdf} onSubmit={onSubmit} />
      {updated}
      {updatePdfLoading && 'Loading...'}
      {updateError}
    </>
  );
};

EditPdf.propTypes = { uuid: string.isRequired };

export default EditPdf;
