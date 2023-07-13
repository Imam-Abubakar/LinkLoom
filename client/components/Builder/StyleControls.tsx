import React from "react";
import { useControls } from "../../store/useControls";
import { Accordion } from "@mantine/core";

const StyleControls = () => {
  const avatarStyle = useControls((e) => e.avatarStyle);
  const backgroundColors_DATA = useControls((e) => e.backgroundColors_DATA);
  const colorTheme_DATA = useControls((e) => e.colorTheme_DATA);
  const userBgColor = useControls((e) => e.userBgColor);
  const userTheme = useControls((e) => e.userTheme);

  const setUserBgColor = useControls((e) => e.setUserBgColor);
  const setAvatarStyle = useControls((e) => e.setAvatarStyle);
  const setUserTheme = useControls((e) => e.setUserTheme);

  return (
    <div className="pt-8 overflow-y-scroll  pr-1 pl-2 flex flex-col space-y-4 select-none ease-linear duration-150">
      <Accordion variant="separated" defaultValue="avatar">
        <Accordion.Item value="avatar">
          <Accordion.Control>Avatar</Accordion.Control>
          <Accordion.Panel>
            <div className="flex flex-row gap-2 flex-wrap">
              <button
                onClick={() => setAvatarStyle("rounded-full")}
                className={`border p-1 rounded-md  ease-linear duration-150 group ${
                  avatarStyle === "rounded-full"
                    ? "border-flow-500"
                    : "hover:border-flow-500 border-gray-700"
                }`}
              >
                <div
                  className={`h-16 w-16 ease-linear duration-150 rounded-full ${
                    avatarStyle === "rounded-full"
                      ? "bg-flow-500"
                      : "group-hover:bg-flow-500 bg-gray-700 "
                  }`}
                ></div>
              </button>
              <button
                onClick={() => setAvatarStyle("rounded-lg")}
                className={`border p-1 rounded-md  ease-linear duration-150 group ${
                  avatarStyle === "rounded-lg"
                    ? "border-flow-500"
                    : "hover:border-flow-500 border-gray-700"
                }`}
              >
                <div
                  className={`h-16 w-16  ease-linear duration-150 rounded-lg ${
                    avatarStyle === "rounded-lg"
                      ? "bg-flow-500"
                      : "group-hover:bg-flow-500 bg-gray-700 "
                  }`}
                ></div>
              </button>
              <button
                onClick={() => setAvatarStyle("rounded-2xl")}
                className={`border p-1 rounded-md  ease-linear duration-150 group ${
                  avatarStyle === "rounded-2xl"
                    ? "border-flow-500"
                    : "hover:border-flow-500 border-gray-700"
                }`}
              >
                <div
                  className={`h-16 w-16 ease-linear duration-150 rounded-2xl ${
                    avatarStyle === "rounded-2xl"
                      ? "bg-flow-500"
                      : "group-hover:bg-flow-500 bg-gray-700 "
                  }`}
                ></div>
              </button>
              <button
                onClick={() => setAvatarStyle("")}
                className={`border p-1 rounded-md  ease-linear duration-150 group ${
                  avatarStyle === ""
                    ? "border-flow-500"
                    : "hover:border-flow-500 border-gray-700"
                }`}
              >
                <div
                  className={`h-16 w-16 ease-linear duration-150  ${
                    avatarStyle === ""
                      ? "bg-flow-500"
                      : "group-hover:bg-flow-500 bg-gray-700 "
                  }`}
                ></div>
              </button>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="theme">
          <Accordion.Control>Theme</Accordion.Control>
          <Accordion.Panel>
            <div className="flex flex-row flex-wrap justify-between gap-2">
              {colorTheme_DATA.map((item, i) => {
                const arr = item.split(" ");
                const e = {
                  c1: arr[0],
                  c2: arr[1],
                  c3: arr[2],
                  c4: arr[3],
                };
                return (
                  <button
                    key={`theme-${i}`}
                    onClick={() => setUserTheme(item)}
                    className={`border rounded-md flex flex-row space-x-3 p-3 items-center flex-wrap justify-center hover:border-flow-500 duration-150 ease-linear ${
                      userTheme === item ? "border-flow-500" : "border-gray-700"
                    }`}
                  >
                    {e.c1 === "" ? (
                      <div>None</div>
                    ) : (
                      <>
                        <div className="flex flex-row -space-x-3">
                          <div
                            style={{ backgroundColor: e.c1 }}
                            className={`w-6 h-6 rounded-full`}
                          ></div>
                          <div
                            style={{ backgroundColor: e.c2 }}
                            className={`w-6 h-6  rounded-full`}
                          ></div>
                          <div
                            style={{ backgroundColor: e.c3 }}
                            className={`w-6 h-6  rounded-full`}
                          ></div>
                          <div
                            style={{ backgroundColor: e.c4 }}
                            className={`w-6 h-6  rounded-full`}
                          ></div>
                        </div>
                        {/*
                        <div className="text-black text-sm font-semibold para">
                          Theme {i + 1}
                        </div>
                    */}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="backgroundColor">
          <Accordion.Control>Background Color</Accordion.Control>
          <Accordion.Panel>
            <div className="flex flex-wrap justify-between gap-2">
              {backgroundColors_DATA.map((e, i) => {
                return (
                  <button
                    key={`bg-${i}`}
                    onClick={() => setUserBgColor(e)}
                    className={`h-16 w-16 p-2 rounded-md border hover:border-flow-500 ease-linear duration-150 ${
                      userBgColor === e ? "border-flow-500" : "border-gray-600"
                    } `}
                  >
                    <div
                      style={{ backgroundImage: e }}
                      className={`h-full w-full rounded-md flex justify-center items-center text-gray-500`}
                    >
                      {e === "" ? "None" : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default StyleControls;
