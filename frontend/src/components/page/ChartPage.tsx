import React from 'react';
import { Body, Navbar, Footer } from 'src/components/layout';
import { ChartGuesser, Card } from 'src/components/molecule';

type PropsDisplayPage = {
  baseUrl: string;
  name: string;
};

export const ChartPage: React.FC<PropsDisplayPage> = ({ baseUrl, name }) => (
  <>
    <main>
      <Navbar baseUrl={baseUrl} name={name} />
      <Body>
        <div className="grid grid-cols-2 gap-8">
          <Card title="First go_threads + goroutines">
            <ChartGuesser
              labels={['go_threads', 'go_goroutines']}
              max={20}
              min={3}
              type="multiple"
            />
          </Card>
          <Card title="Second go_threads + goroutines">
            <ChartGuesser
              labels={['go_threads', 'go_goroutines']}
              max={20}
              min={3}
              type="multiple"
            />
          </Card>
          <Card title="Third go_threads + goroutines">
            <ChartGuesser
              labels={['go_threads', 'go_goroutines']}
              max={20}
              min={3}
              type="multiple"
            />
          </Card>
          <Card title="Fourth go_threads + goroutines">
            <ChartGuesser
              labels={['go_threads', 'go_goroutines']}
              max={20}
              min={3}
              type="multiple"
            />
          </Card>
        </div>
      </Body>
    </main>
    <Footer />
  </>
);
