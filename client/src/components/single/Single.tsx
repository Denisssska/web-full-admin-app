import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AddProduct, AddUser, Modal } from '..';

import { useModal } from '../hooks/useModal';

import './single.scss';

type Props = {
  slug: string;
  id: number;
  img?: string;
  number?: number;
  title: string;
  createdAt?: string;
  lastName?: string;
  info?: object;

  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};

export const Single = (props: Props) => {
  const { isOpen, onClose, onOpen } = useModal();
  return (
    <div key={props.id} className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            <h1>{props.lastName}</h1>
            <img onClick={onOpen} className="createBtn" src="/note.svg" alt="create button" />
          </div>
          <div className="details">
            {/* вариант для response из single запроса */}
            <div className="item">
              <span className="itemTitle">Created:</span>
              <span className="itemValue">{props.createdAt}</span>
            </div>

            {/* вариант для response запроса */}
            {props.info &&
              Object.entries(props.info).map(item => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}</span>
                  <span className="itemValue">{item[1]}</span>
                </div>
              ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey, id) => (
                  <Line key={id} type="monotone" dataKey={dataKey.name} stroke={dataKey.color} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity, id) => (
              <li key={id}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen() && (
        <Modal onClose={onClose} title={`Update ${props.slug}`}>
          {props.slug === 'product' && (
            <AddProduct
              title={props.title}
              img={props.img}
              createdAt={props.createdAt}
              id={props.id}
              number={props.number}
              color={props.info?.color}
              price={props.info?.price}
              producer={props.info?.producer}
              slug={props.slug}
              onClose={onClose}
            />
          )}

          {props.slug === 'user' && (
            <AddUser
              img={props.img}
              email={props.info?.email}
              phone={props.info?.phone}
              firstName={props.title}
              lastName={props.lastName}
              id={props.id}
              createdAt={props.createdAt}
              number={props.number}
              slug={props.slug}
              onClose={onClose}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
