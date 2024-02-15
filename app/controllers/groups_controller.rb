class GroupsController < ApplicationController
  include Searchable

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :groups, -> { search(circle.groups.includes_associated, sortable_fields) }
  expose :group, id: -> { params[:slug] }, scope: -> { Group.includes_associated }, find_by: :slug

  # @route GET /circles/:circle_slug/groups (circle_groups)
  def index
    authorize groups

    paginated_groups = groups.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Groups/Index", props: {
      groups: -> { groups.render(view: :index) },
      pagination: -> { {
        count: groups.size,
        **pagination_data(paginated_groups)
      } },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /groups/:slug (group)
  def show
    authorize group
    render inertia: "Groups/Show", props: {
      group: -> { group.render(view: :show) }
    }
  end

  # @route GET /circles/:circle_slug/groups/new (new_circle_group)
  def new
    authorize Group.new
    render inertia: "Groups/New", props: {
      group: Group.new.render(view: :form_data),
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /groups/:slug/edit (edit_group)
  def edit
    authorize group
    render inertia: "Groups/Edit", props: {
      group: group.render(view: :edit),
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route POST /circles/:circle_slug/groups (circle_groups)
  def create
    authorize Group.new

    group.circle = circle

    if group.save
      redirect_to group, notice: "Group was successfully created."
    else
      redirect_to new_circle_group_path(circle.slug), inertia: { errors: group.errors }
    end
  end

  # @route PATCH /groups/:slug (group)
  # @route PUT /groups/:slug (group)
  def update
    authorize group
    if group.update(group_params)
      redirect_to group, notice: "Group was successfully updated."
    else
      redirect_to edit_group_path, inertia: { errors: group.errors }
    end
  end

  # @route DELETE /groups (groups)
  # @route DELETE /groups/:slug (group)
  def destroy
    authorize group
    group.destroy!
    redirect_to groups_url, notice: "Group was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name).freeze
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
