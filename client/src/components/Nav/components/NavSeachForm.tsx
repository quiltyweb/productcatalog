import React from "react";
import styled from "styled-components";
import { Button } from "bumbag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormikProps } from "formik";

const SearchLabel = styled.label`
  text-align: center;
  @media (min-width: 960px) {
    text-align: right;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 1rem 1rem;
  border-bottom: 1px solid rgb(230, 230, 235);
  @media (min-width: 960px) {
    margin: 0 2rem 0 0;
    flex-direction: row;
    align-items: center;
    border-bottom: initial;
  }
`;

const SearchInput = styled.input`
  margin: 0.5rem 0;
  height: 32px;
  border-radius: 6px;
  border: 1px solid;
  @media (min-width: 425px) {
    margin: 0 0.5rem;
  }
`;

const SearchButton = styled((props) => <Button {...props} />)`
  margin: 0.5rem 0 2rem;
  white-space: nowrap;
  @media (min-width: 960px) {
    margin: 0;
  }
`;

interface FormValues {
  searchTerm: string;
}

export const NavSearchForm = React.forwardRef<
  HTMLInputElement,
  FormikProps<FormValues>
>(
  ({ handleSubmit, handleChange, values }, ref): JSX.Element => {
    return (
      <SearchForm onSubmit={handleSubmit}>
        <SearchLabel htmlFor="searchTerm">Ingrese su búsqueda:</SearchLabel>
        <SearchInput
          id="searchTerm"
          name="searchTerm"
          type="text"
          value={values.searchTerm}
          onChange={handleChange}
          ref={ref}
        />
        <SearchButton type="submit" size="small">
          <FontAwesomeIcon
            aria-hidden={true}
            style={{ marginRight: "0.2rem" }}
            size="sm"
            color="#777777"
            icon={faSearch}
          />
          Buscar
        </SearchButton>
      </SearchForm>
    );
  }
);
