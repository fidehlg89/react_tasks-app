import { useForm } from "react-hook-form";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const params = useParams();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const res = await updateTask(params.id, data);
      console.log("🚀 ~ file: TaskFormPage.jsx:18 ~ onSubmit ~ res:", res);
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const {
          data: { title, description }
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    };
    loadTask();
  }, [params.id, setValue]);

  return (
    <div className="max-w-xl mx-auto">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          className="block w-full p-3 mb-3 rounded-lg bg-zinc-700"
          {...register("title", { required: true })}
        />
        {errors.title && <span>this field is required</span>}
        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          placeholder="Description"
          className="block w-full p-3 mb-3 rounded-lg bg-zinc-700"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>this field is required</span>}
        <button className="block w-full p-3 mt-3 bg-indigo-500 rounded-lg">
          Save
        </button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button
          className="block w-48 p-3 mt-3 bg-red-500 rounded-lg"
          onClick={async () => {
            const accepted = window.confirm("are you sure");
            if (accepted) {
              await deleteTask(params.id);
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
        </div>
      )}
    </div>
  );
};

export default TaskFormPage;
