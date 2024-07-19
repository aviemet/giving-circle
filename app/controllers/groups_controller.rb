class GroupsController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :groups, -> { search(circle.groups.includes_associated, sortable_fields) }
  expose :group, id: -> { params[:slug] }, scope: -> { Group.includes_associated }, find_by: :slug

  strong_params :group, permit: :name

  # @route GET /circles/:circle_slug/groups {export: true} (circle_groups)
  def index
    authorize groups

    paginated_groups = paginate(groups, :items)

    render inertia: "Groups/Index", props: {
      groups: -> { paginated_groups.render(:index) },
      pagination: -> { {
        count: groups.size,
        **pagination_data(paginated_groups)
      } },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /groups/:slug {export: true} (group)
  def show
    authorize group

    render inertia: "Groups/Show", props: {
      group: -> { group.render(:show) }
    }
  end

  # @route GET /circles/:circle_slug/groups/new {export: true} (new_circle_group)
  def new
    authorize Group.new

    render inertia: "Groups/New", props: {
      group: Group.new.render(:form_data),
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /groups/:slug/edit {export: true} (edit_group)
  def edit
    authorize group

    render inertia: "Groups/Edit", props: {
      group: group.render(:edit),
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route POST /circles/:circle_slug/groups {export: true} (circle_groups)
  def create
    authorize Group.new

    group.circle = circle

    if group.save
      redirect_to group, notice: "Group was successfully created."
    else
      redirect_to new_circle_group_path(circle.slug), inertia: { errors: group.errors }
    end
  end

  # @route PATCH /groups/:slug {export: true} (group)
  # @route PUT /groups/:slug {export: true} (group)
  def update
    authorize group

    if group.update(group_params)
      redirect_to group, notice: "Group was successfully updated."
    else
      redirect_to edit_group_path, inertia: { errors: group.errors }
    end
  end

  # @route DELETE /groups {export: true} (groups)
  # @route DELETE /groups/:slug {export: true} (group)
  def destroy
    authorize group

    group.destroy!
    redirect_to groups_url, notice: "Group was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name).freeze
  end
end
