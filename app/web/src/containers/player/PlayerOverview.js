import React from 'react';
import {
  Container, Row, Column, Card,
} from '../../elements';

export default () => (
  <Container>
    <Row>
      <Column>
        <Card title="Games" />
      </Column>
      <Column>
        <Card title="Records" />
        <Card title="Daily K/D" />
      </Column>
    </Row>
  </Container>
);
