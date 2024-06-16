import clsx from 'clsx';
import { DisplayMode } from '../CategoryPage';
import { People, PeopleResponse } from '../schemas/response';
import { useImmer } from 'use-immer';
import { useState } from 'react';
import Modal from './Modal';
import Select from './Select';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

type PeopleCardProps = {
  data: People;
  mode: DisplayMode;
};

type PeopleKeys = keyof People;

const genderOptions = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Unknown', value: 'unknown' },
];

const PeopleCard = ({ data: rawData, mode }: PeopleCardProps) => {
  const isGrid = mode === 'grid';
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<People>(rawData);
  const [tempFormData, setTempFormData] = useImmer<Record<PeopleKeys, People[PeopleKeys]>>(rawData);

  const handleChange = (val: string, key: string) => {
    setTempFormData((draft) => {
      draft[key as PeopleKeys] = val;
    });
  };
  return (
    <>
      <section
        className={clsx(
          'border border-slate-300 rounded-md p-6',
          !isGrid && 'grid gap-4 grid-cols-3'
        )}
      >
        <h4 className={clsx('font-bold', isGrid && 'text-xl', !isGrid && 'text-xl')}>
          {formData.name}
        </h4>
        <ul className={clsx(isGrid && 'mt-4')}>
          <li className={clsx('flex', !isGrid && 'flex-col')}>
            <h4 className="font-semibold">Gender:</h4>
            <p>{formData.gender}</p>
          </li>
          <li className={clsx('flex', !isGrid && 'flex-col')}>
            <h4 className="font-semibold">Birthday Year:</h4>
            <p>{formData.birth_year}</p>
          </li>
        </ul>
        <div className={clsx('flex gap-2 flex-wrap', isGrid && 'mt-4')}>
          <button className="btn" onClick={() => setShowModal(true)}>
            Edit
          </button>
          <button
            className="btn-alert"
            onClick={() => {
              queryClient.setQueryData<InfiniteData<PeopleResponse>>(
                ['people', searchTerm],
                (data) => {
                  if (data) {
                    return {
                      pages: data.pages.map((page) => {
                        const newResults = [...page.results];
                        const idx = newResults.findIndex((elm) => elm.name === formData.name);
                        if (idx > -1) {
                          newResults.splice(idx, 1);

                          return {
                            ...page,
                            results: newResults,
                          };
                        }
                        return page;
                      }),
                      pageParams: data.pageParams,
                    };
                  }
                }
              );
            }}
          >
            Delete
          </button>
        </div>

        <Modal show={showModal} title={'Edit'} onClose={() => setShowModal(false)}>
          <div className="form">
            <div className="field w-full">
              <label className="input-label" htmlFor="name">
                Name
              </label>
              <input
                name="name"
                value={tempFormData.name as string}
                onChange={(e) => handleChange(e.target.value, 'name')}
              />
            </div>
            <div className="field w-full">
              <label className="input-label" htmlFor="gender">
                <span>Gender</span>
              </label>

              <Select
                handleChange={handleChange}
                value={tempFormData.gender as string}
                name="gender"
                options={genderOptions}
              />
            </div>
            <div className="field w-full">
              <label className="input-label" htmlFor="birth_year">
                Birthday Year
              </label>
              <input
                name="birth_year"
                value={tempFormData.birth_year as string}
                onChange={(e) => handleChange(e.target.value, 'birth_year')}
              />
            </div>
          </div>
          <div className="w-full grid mt-10">
            <button
              className="btn"
              onClick={() => {
                setFormData(tempFormData as People);
                queryClient.setQueryData<InfiniteData<PeopleResponse>>(
                  ['people', searchTerm],
                  (data) => {
                    if (data) {
                      return {
                        pages: data.pages.map((page) => {
                          const newResults = [...page.results];
                          const idx = newResults.findIndex((elm) => elm.name === rawData.name);

                          if (idx > -1) {
                            newResults[idx] = tempFormData as People;

                            return {
                              ...page,
                              results: newResults,
                            };
                          }
                          return page;
                        }),
                        pageParams: data.pageParams,
                      };
                    }
                  }
                );
                setShowModal(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default PeopleCard;
