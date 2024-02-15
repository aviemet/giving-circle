class MembersController < ApplicationController
  include Searchable

  expose :circle, id: -> { params[:circle_slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  expose :members, -> { search(Member.includes_associated, sortable_fields) }
  expose :member, id: -> { params[:slug] }, scope: -> { members }, find_by: :slug

  expose :circle_members, -> { search(Circle.find_by(slug: params[:circle_slug]).members) }

  # @route GET /circles/:circle_slug/members (circle_members)
  def index
    authorize members

    paginated_members = circle_members.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Members/Index", props: {
      members: -> { paginated_members.render(view: :index) },
      pagination: -> { {
        count: circle_members.size,
        **pagination_data(paginated_members)
      } },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /members/:slug (member)
  def show
    authorize member

    render inertia: "Members/Show", props: {
      member: -> { member.render(view: :show) }
    }
  end

  # @route GET /circles/:circle_slug/members/new (new_circle_member)
  def new
    authorize Member.new

    render inertia: "Members/New", props: {
      member: Member.new.render(view: :form_data),
    }
  end

  # @route GET /members/:slug/edit (edit_member)
  def edit
    authorize member

    render inertia: "Members/Edit", props: {
      member: member.render(view: :edit)
    }
  end

  # @route POST /circles/:circle_slug/members (circle_members)
  def create
    authorize Member.new

    if member.save
      redirect_to [:admin, member], notice: "Member was successfully created."
    else
      redirect_to [:admin, new_member_path], inertia: { errors: member.errors }
    end
  end

  # @route PATCH /members/:slug (member)
  # @route PUT /members/:slug (member)
  def update
    authorize member

    if member.update(member_params)
      redirect_to [:admin, member], notice: "Member was successfully updated."
    else
      redirect_to [:admin, edit_member_path], inertia: { errors: member.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/members (circle_members)
  # @route DELETE /members/:slug (member)
  def destroy
    authorize member

    member.destroy
    redirect_to [:admin, members_url], notice: "Member was successfully destroyed."
  end

  private

  def sortable_fields
    %w(first_name last_name number).freeze
  end

  def member_params
    params.require(:member).permit(:first_name, :last_name, :number)
  end
end
