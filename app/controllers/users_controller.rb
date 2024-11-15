class UsersController < ApplicationController
  include Contactable

  expose :users, -> { search(User.all.includes_associated) }
  expose :user, id: -> { params[:slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  strong_params :user, permit: [:email, :password, :active, :first_name, :last_name, :number]

  sortable_fields %w(email active first_name last_name number)

  # @route GET /users (users)
  def index
    authorize users

    paginated_users = paginate(users, :users)

    render inertia: "Users/Index", props: {
      users: paginated_users.render,
      pagination: -> { {
        count: users.count,
        **pagination_data(paginated_users)
      } }
    }
  end

  # @route GET /users/:id (user)
  def show
    authorize user
    render inertia: "Users/Show", props: {
      user: user.render
    }
  end

  # @route GET /users/new (new_user)
  def new
    authorize User
    render inertia: "Users/New", props: {
      user: user.render
    }
  end

  # @route GET /users/:id/edit (edit_user)
  def edit
    authorize user
    render inertia: "Users/Edit", props: {
      user: user.render
    }
  end

  # @route PATCH /users/:id (user)
  # @route PUT /users/:id (user)
  def update
    authorize user
    if user.update(user_params)
      redirect_to user, notice: 'User was successfully updated.'
    else
      redirect_to edit_user_path(user), inertia: { errors: user.errors }
    end
  end

  # @route DELETE /users/:id (user)
  def destroy
    authorize user
    user.destroy
    respond_to do
      redirect_to users_url, notice: 'User was successfully destroyed.'
    end
  end
end
