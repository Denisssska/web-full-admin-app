import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AddProduct, AddUser, Modal } from '..';

import { profileIDSelector, useAppSelector } from '../../store';

import { ProductsSchemaType, ProfileSchemaType } from '../../utils';

import { useModal } from '../hooks/useModal';

import './single.scss';


type UserAndProductInfoType = {
  slug: string;
  chart: {
    dataKeys: DataKeys[];
    data: Data[];
  };
  activities: Activities[];
};
type UserType = ProfileSchemaType & UserAndProductInfoType;
type ProductType = ProductsSchemaType & UserAndProductInfoType;
type AllTypeProps = UserType & ProductType;

export const Single = (props: AllTypeProps) => {
  const userId = useAppSelector(profileIDSelector);
  const createdData = new Date(props.createdAt).toLocaleDateString();
  const { isOpen, onClose, onOpen } = useModal();
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src={props.profilePhoto || props.img} alt="" />
            <h1>{props.title}</h1>
            <h1>{props.username}</h1>
            {userId === props._id && (
              <img onClick={onOpen} className="createBtn" src="/note.svg" alt="create button" />
            )}
          </div>
          <div className="details">
            {/* вариант для response из single запроса */}
            <div className="item">
              <span className="itemTitle">Created:</span>
              <span className="itemValue">{createdData}</span>
            </div>
            <div className="item">
              <span className="itemTitle">first name:</span>
              <span className="itemValue">{props.firstname}</span>
            </div>
            <div className="item">
              <span className="itemTitle">last name:</span>
              <span className="itemValue">{props.lastname}</span>
            </div>
            <div className="item">
              <span className="itemTitle">email:</span>
              <span className="itemValue">{props.email}</span>
            </div>
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
          {props.slug === 'product' && (<div>
            product
          </div>
            // <AddProduct
            //   title={props.title}
            //   img={props.img}
            //   createdAt={createdData}
            //   id={props._id}
            //   number={props.number}
            //   color={props.info?.color}
            //   price={props.info?.price}
            //   producer={props.info?.producer}
            //   slug={props.slug}
            //   onClose={onClose}
            // />
          )}

          {props.slug === 'user' && (
            <AddUser
              profilePhoto={props.profilePhoto}
              email={props.email}
              phone={props.phone}
              firstname={props.firstname}
              lastname={props.lastname}
              id={props._id}
              createdAt={createdData}
              slug={props.slug}
              onClose={onClose}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
