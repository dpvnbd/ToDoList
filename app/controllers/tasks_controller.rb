class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = Task.create!(task_params)
    render json: @task
  end

  def update
    @task.update(task_params)
    head :no_content
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private
  def task_params
    params.permit(:title, :description, :deadline, :status, :priority)
  end

  def set_task
    @task = Task.find(params[:id])
  end
end
