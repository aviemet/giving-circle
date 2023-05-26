class UsersController < ApplicationController
  include Searchable
  include ContactableConcern

  expose :users, -> { search(User.all.includes_associated, sortable_fields) }
  expose :user, id: ->{ params[:slug] }, scope: ->{ Circle.includes_associated }, find_by: :slug

  # GET /users
  def index
    authorize users
    paginated_users = users.page(params[:page] || 1)

    render inertia: "Users/Index", props: {
      users: users.render,
      pagination: -> { {
        count: users.count,
        **pagination_data(paginated_users)
      } }
    }
  end

  # GET /users/:id
  def show
    authorize user
    render inertia: "Users/Show", props: {
      user: user.render
    }
  end

  # GET /users/new
  def new
    authorize User
    render inertia: "Users/New", props: {
      user: user.render
    }
  end

  # GET /users/:id/edit
  def edit
    authorize user
    render inertia: "Users/Edit", props: {
      user: user.render
    }
  end

  # GET /users/complete_registration
  def complete_registration
    render inertia: "Public/Devise/Register/Complete"
  end

  # POST /users/complete_registration
  def save_complete_registration
    params.permit!

    person = Person.new(params[:person])
    person.user = current_user

    if current_user.save
      redirect_to root_path
    end
  rescue ActiveRecord::RecordInvalid
    redirect_to complete_registration_path
  end

  # PATCH/PUT /users/:id
  def update
    authorize user
    if user.update(user_params)
      redirect_to user, notice: 'User was successfully updated.'
    else
      redirect_to edit_user_path(user), inertia: { errors: user.errors }
    end
  end

  # DELETE /users/:id
  def destroy
    authorize user
    user.destroy
    respond_to do
      redirect_to users_url, notice: 'User was successfully destroyed.'
    end
  end

  private

  def sortable_fields
    %w(email active first_name last_name number).freeze
  end

  def user_params
    params.require(:user).permit(:email, :password, :active, :first_name, :last_name, :number)
  end
end
