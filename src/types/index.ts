/**
 * Portfolio Type Definitions
 *
 * This file contains TypeScript type definitions for the portfolio data store.
 * Uses basic type checking (non-strict mode) for gradual adoption.
 */

/** Project category classification */
export type ProjectCategory = 'corporate' | 'personal';

/** Industry classification for projects */
export type ProjectIndustry =
  | 'e-commerce'
  | 'online-payment'
  | 'b2b'
  | 'sales'
  | 'devops'
  | 'web'
  | 'mobile'
  | 'llm';

/** Skill with icon representation */
export interface Skill {
  /** Skill display name */
  name: string;
  /** Bootstrap Icons class name (bi-*) */
  icon: string;
}

/** Career/Employment history entry */
export interface Career {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Company display name */
  company: string;
  /** Role description */
  description: string;
  /** Employment date range */
  dates: string;
  /** External URL or null */
  url: string | null;
  /** Logo URL for light mode */
  logo: string | null;
  /** Logo URL for dark mode */
  logoDark: string | null;
  /** Platform icons (bi-* classes) */
  platforms: string[];
  /** Logo/image copyright notice or attribution */
  logoCopyrightNotice?: string;
}

/** Project worked on during career */
export interface Project {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Project display name */
  name: string;
  /** Corporate or personal project */
  category: ProjectCategory;
  /** Industry classification */
  industry: ProjectIndustry;
  /** Reference to career.id, null for personal projects */
  careerId: string | null;
  /** Project description */
  description: string;
  /** Project date range */
  dates: string;
  /** External URL or null */
  url: string | null;
  /** Logo URL for light mode */
  logo: string | null;
  /** Logo URL for dark mode */
  logoDark: string | null;
  /** Platform icons (bi-* classes) */
  platforms: string[];
  /** Skills used in the project */
  skills: Skill[];
  /** Screenshot image paths */
  screenshots: string[];
}

/** Filter options for project list */
export type ProjectFilter = 'all' | 'corporate' | 'personal';
