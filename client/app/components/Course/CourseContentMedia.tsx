import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  user: any;
  activeVideo: number;
  refetch: any;
  setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  refetch,
  setActiveVideo,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const { data: course, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation({});
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    { isLoading: reviewLoading, isSuccess: reviewSuccess, error: reviewError },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      toast.success("Question added successfully");
      refetch();
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question from ${data[activeVideo].title}`,
        userId: user._id
      })
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if(user.role !== "admin"){
        socketId.emit("notification", {
          title: "New Question Reply Received",
          message: `You have review reply from ${data[activeVideo].title}`,
        })
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(0);
      courseRefetch();
      toast.success("Review added successfully");
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review from ${data[activeVideo].title}`,
        userId: user._id
      })
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    refetch,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    courseRefetch,
    replySuccess,
    replyError,
    activeVideo,
    data,
    user
  ]);

  const handleAnswerSubmit = async () => {
    await addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between !py-[unset] mt-8">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="ml-2" />
          Next Lesson
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[#000] dark:text-[#fff]">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full flex p-4 items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "text-[#000] dark:text-white"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
              <br />
              <br />
              <br />
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              alt="profile-image"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={50}
              rows={5}
              placeholder="Write your question..."
              className="outline-none  bg-transparent ml-3 border border-black dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] font-Poppins 800px:text-[18px] text-black dark:text-white"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-black"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    alt="profile-image"
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={50}
                      rows={5}
                      placeholder="Write your comments..."
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] font-Poppins 800px:text-[18px] text-black dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                      reviewLoading && "cursor-no-drop"
                    }`}
                    onClick={reviewLoading ? () => {} : handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-black"></div>
            <div className="w-full">
              {(
                course?.course?.reviews &&
                [...course?.course?.reviews].reverse()
              ).map((item: any, index: number) => (
                <div className="w-full my-5" key={index}>
                  <div className="w-full flex">
                    <div className="">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        alt="profile-image"
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-2">
                      <h1 className="text-[18px] text-black dark:text-white">
                        {item.user.name}
                      </h1>
                      <Ratings rating={item.rating} />
                      <p className="text-black dark:text-white">
                        {item.comment}
                      </p>
                      <small className="text-black dark:text-white">
                        {format(item.createdAt)}
                      </small>
                    </div>
                  </div>
                  {user.role === "admin" && item.commentReplies.length === 0 && (
                    <span
                      className={`${styles.label} cursor-pointer !ml-10`}
                      onClick={() => {
                        setIsReviewReply(true);
                        setReviewId(item._id);
                      }}
                    >
                      Add Reply{" "}
                    </span>
                  )}

                  {isReviewReply && reviewId === item._id && (
                    <div className="w-full flex relative">
                      <input
                        type="text"
                        name=""
                        id=""
                        value={reply}
                        onChange={(e: any) => setReply(e.target.value)}
                        placeholder="Enter your Reply"
                        className="block 800px:ml-10 mt-2 outline-none bg-transparent border-b
                        border-[#000] dark:border-[#fff] p-[5px] w-[95%] text-black dark:text-white"
                      />
                      <button
                        type="submit"
                        className="absolute right-0 bottom-1 text-black dark:text-white"
                        onClick={handleReviewReplySubmit}
                      >
                        Submit
                      </button>
                    </div>
                  )}

                  {item.commentReplies.map((i: any, index: number) => (
                    <div
                      className="w-full 800px:ml-16 my-5 text-black dark:text-white flex"
                      key={index}
                    >
                      <div>
                        <Image
                          src={
                            i.user.avatar
                              ? i.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          alt="profile-image"
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center">
                          <h5 className="text-[20px] text-black dark:text-white">
                            {i?.user.name}
                          </h5>
                          <VscVerifiedFilled
                            className={`text-green-500 ml-1 text-[20px] ${
                              i.user.role !== "admin" && "hidden"
                            }`}
                          />
                        </div>
                        <p className="text-black dark:text-white">
                          {i?.comment}
                        </p>
                        <small className="text-black dark:text-[#ffffff83]">
                          {format(i?.createdAt)}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <br />
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            questionId={questionId}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  questionId,
  setQuestionId,
  item,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div className="w-[50px] h-[50px]">
            <div className="w-[50px] h-[50px] bg-slate-500 rounded-[50px] flex items-center justify-center cursor-pointer">
              <Image
                src={
                  item.user.avatar
                    ? item.user.avatar.url
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                }
                alt="profile-image"
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </div>
          </div>
          <div className="pl-3">
            <h5 className="text-[20px] text-black dark:text-white">
              {item?.user.name}
            </h5>
            <p className="text-black dark:text-white">{item?.question}</p>
            <small className="text-black dark:text-[#ffffff83]">
              {format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex dark:text-white text-black">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-black dark:text-[#ffffff83]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-black dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div
                className="w-full 800px:ml-16 my-5 text-black dark:text-white flex"
                key={index}
              >
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    alt="profile-image"
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px] text-black dark:text-white">
                      {item?.user.name}
                    </h5>
                    <VscVerifiedFilled
                      className={`text-green-500 ml-1 text-[20px] ${
                        item.user.role !== "admin" && "hidden"
                      }`}
                    />
                  </div>
                  <p className="text-black dark:text-white">{item?.answer}</p>
                  <small className="text-black dark:text-[#ffffff83]">
                    {format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer ..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="black 800px:ml-12 mt-2 outline-none text-black dark:text-white bg-transparent border-b border-[#00000027] dark:border-[#fff] p-[5px] w-[95%]"
                />
                <button
                  type="submit"
                  className={`absolute right-0 bottom-1 text-black dark:text-white ${
                    answer === "" || answerCreationLoading
                      ? "cursor-no-drop"
                      : "cursor-pointer"
                  }`}
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
