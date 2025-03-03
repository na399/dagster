import {Body, Box, colorBackgroundLight, colorTextLighter} from '@dagster-io/ui-components';
import * as React from 'react';
import styled from 'styled-components';

import {SectionedLeftNav} from '../ui/SectionedLeftNav';
import {DagsterRepoOption, WorkspaceContext} from '../workspace/WorkspaceContext';
import {RepoAddress} from '../workspace/types';

import {RepoNavItem} from './RepoNavItem';
import {RepositoryLocationStateObserver} from './RepositoryLocationStateObserver';

const LoadedRepositorySection = ({
  allRepos,
  visibleRepos,
  toggleVisible,
}: {
  allRepos: DagsterRepoOption[];
  visibleRepos: DagsterRepoOption[];
  toggleVisible: (repoAddresses: RepoAddress[]) => void;
}) => {
  const listContent = () => {
    if (visibleRepos.length) {
      return (
        <div style={{overflow: 'hidden'}}>
          <SectionedLeftNav />
        </div>
      );
    }

    if (allRepos.length > 0) {
      return (
        <EmptyState>
          <Box flex={{direction: 'column', gap: 8}} padding={{top: 12}}>
            <span style={{fontSize: '16px', fontWeight: 500}}>No definitions</span>
            <Body>Select a code location to see a list of jobs</Body>
          </Box>
        </EmptyState>
      );
    }

    return (
      <EmptyState>
        <Box flex={{direction: 'column', gap: 8}} padding={{top: 12}}>
          <span style={{fontSize: '16px', fontWeight: 500}}>No definitions</span>
          <Body>When you add a code location, your definitions will appear here</Body>
        </Box>
      </EmptyState>
    );
  };

  return (
    <Container>
      <ListContainer>{listContent()}</ListContainer>
      <RepositoryLocationStateObserver />
      <RepoNavItem allRepos={allRepos} selected={visibleRepos} onToggle={toggleVisible} />
    </Container>
  );
};

const Container = styled.div`
  background: ${colorBackgroundLight()};
  display: flex;
  flex: 1;
  overflow: none;
  flex-direction: column;
  min-height: 0;
`;

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
`;

const EmptyState = styled.div`
  color: ${colorTextLighter()};
  line-height: 20px;
  padding: 6px 24px 0;
`;

export const LeftNavRepositorySection = React.memo(() => {
  const {allRepos, loading, visibleRepos, toggleVisible} = React.useContext(WorkspaceContext);

  if (loading) {
    return <div style={{flex: 1}} />;
  }

  return (
    <LoadedRepositorySection
      allRepos={allRepos}
      visibleRepos={visibleRepos}
      toggleVisible={toggleVisible}
    />
  );
});
