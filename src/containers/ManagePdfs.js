import React from 'react';

import { gql, useMutation } from '@apollo/client';

import PdfForm from '../components/PdfForm';

import ListPdfs from './ListPdfs';

const ADD_PDF = gql`
  mutation addPdf($input: PdfInput!) {
    upsertPdf(input: $input) {
      uuid
    }
  }
`;

const ADD_PDF_OPTS = {
  update(cache, { data: { upsertPdf } }) {
    cache.modify({
      fields: {
        pdfs(existingPdfs = []) {
          const newPdfRef = cache.writeFragment({
            data: upsertPdf,
            fragment: gql`
              fragment NewPdf on Pdf {
                id
                type
              }
            `,
          });
          return [...existingPdfs, newPdfRef];
        },
      },
    });
  },
};

const ManagePdfs = () => {
  const [
    addPdf,
    { loading: addPdfLoading, error: addPdfError, data: addPdfData },
  ] = useMutation(ADD_PDF, ADD_PDF_OPTS);

  if (addPdfError) {
    console.log(
      'xxx',
      addPdfError.message,
      addPdfError.graphQLErrors,
      addPdfError.extraInfo,
      addPdfError.networkError,
      addPdfError.errors,
      addPdfData
    );
  }
  const error = addPdfError && <p>{addPdfError.message}</p>;
  const created = addPdfData && <p>Added PDF {addPdfData.upsertPdf.uuid}</p>;

  const onSubmit = (input) => {
    addPdf({
      variables: {
        input,
      },
    });
  };

  return (
    <div className="managePdfs">
      <ListPdfs />
      <PdfForm onSubmit={onSubmit} />
      {created}
      {addPdfLoading && 'Loading...'}
      {error}
    </div>
  );
};

export default ManagePdfs;
