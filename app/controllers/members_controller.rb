class MembersController < ApplicationController
  include Searchable

  expose :members, -> { search(Member.includes_associated, sortable_fields) }
  expose :member, scope: -> { members }, find: ->(id, scope) { scope.includes_associated.find(id) }

  # @route GET /circles/:circle_slug/members (circle_members)
  # @route GET /themes/:theme_slug/members (theme_members)
  def index
    authorize members
    render inertia: "Members/Index", props: {
      members: -> { members.render }
    }
  end

  # @route GET /members/:slug (member)
  # @route GET /members/:slug (member)
  def show
    authorize member
    render inertia: "Members/Show", props: {
      member: -> { member.render }
    }
  end

  # @route GET /circles/:circle_slug/members/new (new_circle_member)
  # @route GET /themes/:theme_slug/members/new (new_theme_member)
  def new
    authorize Member.new
    render inertia: "Members/New", props: {
      member: Member.new.render
    }
  end

  # @route GET /members/:slug/edit (edit_member)
  # @route GET /members/:slug/edit (edit_member)
  def edit
    authorize member
    render inertia: "Members/Edit", props: {
      member: member.render
    }
  end

  # @route POST /circles/:circle_slug/members (circle_members)
  # @route POST /themes/:theme_slug/members (theme_members)
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
  # @route DELETE /themes/:theme_slug/members (theme_members)
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
